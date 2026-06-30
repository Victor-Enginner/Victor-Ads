import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// =============================================
// SCHEMAS
// =============================================

const createContactSchema = z.object({
  externalId: z.string().min(1),
  channel: z.enum(['whatsapp', 'web', 'instagram', 'telegram']).default('whatsapp'),
  name: z.string().optional(),
  phone: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const updateContactSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// =============================================
// GET /api/contacts
// =============================================

router.get('/', async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;

  if (!tenantId) {
    res.status(400).json({ error: 'No tenant associated' });
    return;
  }

  const result = await query(
    `SELECT id, external_id, channel, name, phone, profile, tags, last_contact_at, created_at
     FROM contacts WHERE tenant_id = $1
     ORDER BY last_contact_at DESC NULLS LAST, created_at DESC`,
    [tenantId]
  );

  res.json(result.rows);
});

// =============================================
// GET /api/contacts/:id
// =============================================

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;

  const result = await query(
    `SELECT id, external_id, channel, name, phone, profile, tags, last_contact_at, created_at
     FROM contacts WHERE id = $1 AND tenant_id = $2`,
    [id, tenantId]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Contact not found' });
    return;
  }

  res.json(result.rows[0]);
});

// =============================================
// POST /api/contacts
// =============================================

router.post('/', validate(createContactSchema), async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;

  if (!tenantId) {
    res.status(400).json({ error: 'No tenant associated' });
    return;
  }

  const { externalId, channel, name, phone, tags } = req.body;

  const result = await query(
    `INSERT INTO contacts (tenant_id, external_id, channel, name, phone, tags)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (tenant_id, external_id) DO UPDATE
       SET name = COALESCE(EXCLUDED.name, contacts.name),
           phone = COALESCE(EXCLUDED.phone, contacts.phone),
           tags = CASE WHEN EXCLUDED.tags IS NOT NULL THEN EXCLUDED.tags ELSE contacts.tags END
     RETURNING *`,
    [tenantId, externalId, channel, name, phone, tags || []]
  );

  res.status(201).json(result.rows[0]);
});

// =============================================
// PATCH /api/contacts/:id
// =============================================

router.patch('/:id', validate(updateContactSchema), async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;

  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (req.body.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(req.body.name);
  }
  if (req.body.phone !== undefined) {
    fields.push(`phone = $${idx++}`);
    values.push(req.body.phone);
  }
  if (req.body.tags !== undefined) {
    fields.push(`tags = $${idx++}`);
    values.push(req.body.tags);
  }

  if (fields.length === 0) {
    res.status(400).json({ error: 'No fields to update' });
    return;
  }

  values.push(id, tenantId);

  const result = await query(
    `UPDATE contacts SET ${fields.join(', ')} WHERE id = $${idx++} AND tenant_id = $${idx} RETURNING *`,
    values
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Contact not found' });
    return;
  }

  res.json(result.rows[0]);
});

export default router;
