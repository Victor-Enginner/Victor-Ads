import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/database.js';
import { hashPassword, comparePassword, generateTokens, type TokenPayload } from '../utils/jwt.js';
import { validate } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// =============================================
// SCHEMAS
// =============================================

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  fullName: z.string().min(2).max(100),
  tenantName: z.string().min(2).max(100).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

// =============================================
// POST /api/auth/register
// =============================================

router.post('/register', validate(registerSchema), async (req: Request, res: Response) => {
  const { email, password, fullName, tenantName } = req.body;

  // Check if user exists
  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    res.status(409).json({ error: 'Email already registered' });
    return;
  }

  const passwordHash = await hashPassword(password);

  // Create tenant first if provided
  let tenantId: string | null = null;

  if (tenantName) {
    const slug = tenantName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const tenantResult = await query(
      `INSERT INTO tenants (name, slug, niche, plan)
       VALUES ($1, $2, 'dentist', 'starter')
       RETURNING id`,
      [tenantName, slug]
    );
    tenantId = tenantResult.rows[0].id;
  }

  // Create user
  const userResult = await query(
    `INSERT INTO users (email, password_hash, full_name, role, tenant_id)
     VALUES ($1, $2, $3, 'owner', $4)
     RETURNING id, email, full_name, role, tenant_id`,
    [email, passwordHash, fullName, tenantId]
  );

  const user = userResult.rows[0];

  const tokens = generateTokens({
    userId: user.id,
    tenantId: user.tenant_id,
    role: user.role,
  });

  res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      tenantId: user.tenant_id,
    },
    ...tokens,
  });
});

// =============================================
// POST /api/auth/login
// =============================================

router.post('/login', validate(loginSchema), async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await query(
    `SELECT id, email, password_hash, full_name, role, tenant_id
     FROM users WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const user = result.rows[0];
  const valid = await comparePassword(password, user.password_hash);

  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const tokens = generateTokens({
    userId: user.id,
    tenantId: user.tenant_id,
    role: user.role,
  });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      tenantId: user.tenant_id,
    },
    ...tokens,
  });
});

// =============================================
// POST /api/auth/refresh
// =============================================

router.post('/refresh', validate(refreshSchema), async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const payload = await import('../utils/jwt.js').then((m) =>
      m.verifyToken(refreshToken)
    );

    // Re-fetch user to ensure still valid
    const result = await query(
      `SELECT id, email, full_name, role, tenant_id FROM users WHERE id = $1`,
      [payload.userId]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    const user = result.rows[0];
    const tokens = generateTokens({
      userId: user.id,
      tenantId: user.tenant_id,
      role: user.role,
    });

    res.json(tokens);
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// =============================================
// GET /api/auth/me
// =============================================

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  const result = await query(
    `SELECT u.id, u.email, u.full_name, u.role, u.tenant_id,
            t.name as tenant_name, t.slug as tenant_slug, t.niche, t.plan
     FROM users u
     LEFT JOIN tenants t ON u.tenant_id = t.id
     WHERE u.id = $1`,
    [req.user!.userId]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const row = result.rows[0];
  res.json({
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
    tenant: row.tenant_id ? {
      id: row.tenant_id,
      name: row.tenant_name,
      slug: row.tenant_slug,
      niche: row.niche,
      plan: row.plan,
    } : null,
  });
});

export default router;
