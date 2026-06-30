import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();

// All tenant routes require auth
router.use(authMiddleware);

// =============================================
// SCHEMAS
// =============================================

const createTenantSchema = z.object({
  name: z.string().min(2).max(100),
  niche: z.enum(['dentist', 'restaurant', 'lawyer', 'architect', 'content-producer']).default('dentist'),
  businessHours: z.record(z.any()).optional(),
  services: z.array(z.object({
    name: z.string(),
    duration: z.number(),
    price: z.number().optional(),
  })).optional(),
});

const updateTenantSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  businessHours: z.record(z.any()).optional(),
  services: z.array(z.object({
    name: z.string(),
    duration: z.number(),
    price: z.number().optional(),
  })).optional(),
  settings: z.record(z.any()).optional(),
});

// =============================================
// GET /api/tenants — List tenants (admin sees all)
// =============================================

router.get('/', async (req: Request, res: Response) => {
  let result;

  if (req.user!.role === 'owner' && req.user!.tenantId) {
    // Owner sees their tenant
    result = await query(
      `SELECT id, name, slug, niche, plan, whatsapp_number, business_hours, services, settings, created_at
       FROM tenants WHERE id = $1`,
      [req.user!.tenantId]
    );
  } else {
    result = await query(
      `SELECT id, name, slug, niche, plan, whatsapp_number, business_hours, services, settings, created_at
       FROM tenants ORDER BY created_at DESC`
    );
  }

  res.json(result.rows);
});

// =============================================
// GET /api/tenants/:id
// =============================================

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  // Verify access
  if (req.user!.tenantId && req.user!.tenantId !== id && req.user!.role !== 'admin') {
    res.status(403).json({ error: 'Access denied' });
    return;
  }

  const result = await query(
    `SELECT id, name, slug, niche, plan, whatsapp_number, business_hours, services, settings, created_at
     FROM tenants WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Tenant not found' });
    return;
  }

  res.json(result.rows[0]);
});

// =============================================
// POST /api/tenants
// =============================================

router.post('/', validate(createTenantSchema), async (req: Request, res: Response) => {
  const { name, niche, businessHours, services } = req.body;

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const result = await query(
    `INSERT INTO tenants (name, slug, niche, plan, owner_id, business_hours, services)
     VALUES ($1, $2, $3, 'starter', $4, $5, $6)
     RETURNING *`,
    [name, slug, niche, req.user!.userId, JSON.stringify(businessHours || {}), JSON.stringify(services || [])]
  );

  // Update user's tenant_id
  await query(
    'UPDATE users SET tenant_id = $1 WHERE id = $2',
    [result.rows[0].id, req.user!.userId]
  );

  res.status(201).json(result.rows[0]);
});

// =============================================
// PATCH /api/tenants/:id
// =============================================

router.patch('/:id', validate(updateTenantSchema), async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.user!.tenantId !== id && req.user!.role !== 'admin') {
    res.status(403).json({ error: 'Access denied' });
    return;
  }

  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  const body = req.body;

  if (body.name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    values.push(body.name);
  }
  if (body.businessHours !== undefined) {
    fields.push(`business_hours = $${paramIndex++}`);
    values.push(JSON.stringify(body.businessHours));
  }
  if (body.services !== undefined) {
    fields.push(`services = $${paramIndex++}`);
    values.push(JSON.stringify(body.services));
  }
  if (body.settings !== undefined) {
    fields.push(`settings = $${paramIndex++}`);
    values.push(JSON.stringify(body.settings));
  }

  if (fields.length === 0) {
    res.status(400).json({ error: 'No fields to update' });
    return;
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const result = await query(
    `UPDATE tenants SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Tenant not found' });
    return;
  }

  res.json(result.rows[0]);
});

// =============================================
// DELETE /api/tenants/:id
// =============================================

router.delete('/:id', requireRole('admin'), async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await query('DELETE FROM tenants WHERE id = $1 RETURNING id', [id]);

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Tenant not found' });
    return;
  }

  res.json({ deleted: true });
});

export default router;
