import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

const createConversationSchema = z.object({
  contactId: z.string().uuid(),
  intent: z.string().optional(),
  assignedTo: z.string().uuid().optional(),
});

const updateConversationSchema = z.object({
  status: z.enum(['active', 'ended', 'archived']).optional(),
  intent: z.string().optional(),
  assignedTo: z.string().uuid().optional().nullable(),
  endedAt: z.string().datetime().optional().nullable(),
});

// GET /api/conversations
router.get('/', async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;

  const result = await query(
    `SELECT c.id, c.contact_id, c.status, c.intent, c.assigned_to,
            c.started_at, c.ended_at,
            ct.name as contact_name, ct.phone as contact_phone
     FROM conversations c
     LEFT JOIN contacts ct ON c.contact_id = ct.id
     WHERE c.tenant_id = $1
     ORDER BY c.started_at DESC`,
    [tenantId]
  );

  res.json(result.rows);
});

// GET /api/conversations/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;

  const result = await query(
    `SELECT c.id, c.contact_id, c.status, c.intent, c.assigned_to,
            c.started_at, c.ended_at,
            ct.name as contact_name, ct.phone as contact_phone
     FROM conversations c
     LEFT JOIN contacts ct ON c.contact_id = ct.id
     WHERE c.id = $1 AND c.tenant_id = $2`,
    [id, tenantId]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  res.json(result.rows[0]);
});

// POST /api/conversations
router.post('/', validate(createConversationSchema), async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;
  const { contactId, intent, assignedTo } = req.body;

  const result = await query(
    `INSERT INTO conversations (tenant_id, contact_id, intent, assigned_to)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [tenantId, contactId, intent || null, assignedTo || null]
  );

  res.status(201).json(result.rows[0]);
});

// PATCH /api/conversations/:id
router.patch('/:id', validate(updateConversationSchema), async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;
  const updates: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (req.body.status !== undefined) {
    updates.push(`status = $${idx++}`);
    values.push(req.body.status);
  }
  if (req.body.intent !== undefined) {
    updates.push(`intent = $${idx++}`);
    values.push(req.body.intent);
  }
  if (req.body.assignedTo !== undefined) {
    updates.push(`assigned_to = $${idx++}`);
    values.push(req.body.assignedTo);
  }
  if (req.body.endedAt !== undefined) {
    updates.push(`ended_at = $${idx++}`);
    values.push(req.body.endedAt);
  }

  if (updates.length === 0) {
    res.status(400).json({ error: 'No fields to update' });
    return;
  }

  values.push(id, tenantId);

  const result = await query(
    `UPDATE conversations SET ${updates.join(', ')}
     WHERE id = $${idx++} AND tenant_id = $${idx}
     RETURNING *`,
    values
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  res.json(result.rows[0]);
});

export default router;