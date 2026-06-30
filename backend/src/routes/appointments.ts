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

const createAppointmentSchema = z.object({
  contactId: z.string().uuid(),
  service: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  time: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM
  durationMinutes: z.number().min(15).max(240).default(30),
  notes: z.string().optional(),
});

const updateAppointmentSchema = z.object({
  status: z.enum(['scheduled', 'confirmed', 'completed', 'cancelled', 'no_show']).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  notes: z.string().optional(),
});

// =============================================
// GET /api/appointments
// =============================================

router.get('/', async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;
  const { date, status, from, to } = req.query;

  let whereClause = 'WHERE a.tenant_id = $1';
  const params: unknown[] = [tenantId];
  let paramIdx = 2;

  if (date) {
    whereClause += ` AND a.date = $${paramIdx++}`;
    params.push(date);
  }
  if (status) {
    whereClause += ` AND a.status = $${paramIdx++}`;
    params.push(status);
  }
  if (from) {
    whereClause += ` AND a.date >= $${paramIdx++}`;
    params.push(from);
  }
  if (to) {
    whereClause += ` AND a.date <= $${paramIdx++}`;
    params.push(to);
  }

  const result = await query(
    `SELECT a.id, a.service, a.date, a.time, a.duration_minutes, a.status,
            a.confirmed_at, a.reminder_sent, a.notes, a.created_at,
            c.name as contact_name, c.external_id as contact_external_id
     FROM appointments a
     LEFT JOIN contacts c ON a.contact_id = c.id
     ${whereClause}
     ORDER BY a.date ASC, a.time ASC`,
    params
  );

  res.json(result.rows);
});

// =============================================
// GET /api/appointments/:id
// =============================================

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;

  const result = await query(
    `SELECT a.*, c.name as contact_name, c.external_id as contact_external_id
     FROM appointments a
     LEFT JOIN contacts c ON a.contact_id = c.id
     WHERE a.id = $1 AND a.tenant_id = $2`,
    [id, tenantId]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Appointment not found' });
    return;
  }

  res.json(result.rows[0]);
});

// =============================================
// POST /api/appointments
// =============================================

router.post('/', validate(createAppointmentSchema), async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;

  if (!tenantId) {
    res.status(400).json({ error: 'No tenant associated' });
    return;
  }

  const { contactId, service, date, time, durationMinutes, notes } = req.body;

  // Check for conflicts
  const conflicts = await query(
    `SELECT id FROM appointments
     WHERE tenant_id = $1 AND date = $2 AND time = $3
     AND status NOT IN ('cancelled')`,
    [tenantId, date, time]
  );

  if (conflicts.rows.length > 0) {
    res.status(409).json({ error: 'Time slot already booked' });
    return;
  }

  const result = await query(
    `INSERT INTO appointments (tenant_id, contact_id, service, date, time, duration_minutes, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [tenantId, contactId, service, date, time, durationMinutes, notes]
  );

  res.status(201).json(result.rows[0]);
});

// =============================================
// PATCH /api/appointments/:id
// =============================================

router.patch('/:id', validate(updateAppointmentSchema), async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;

  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (req.body.status !== undefined) {
    fields.push(`status = $${idx++}`);
    values.push(req.body.status);
    if (req.body.status === 'confirmed') {
      fields.push(`confirmed_at = NOW()`);
    }
  }
  if (req.body.date !== undefined) {
    fields.push(`date = $${idx++}`);
    values.push(req.body.date);
  }
  if (req.body.time !== undefined) {
    fields.push(`time = $${idx++}`);
    values.push(req.body.time);
  }
  if (req.body.notes !== undefined) {
    fields.push(`notes = $${idx++}`);
    values.push(req.body.notes);
  }

  if (fields.length === 0) {
    res.status(400).json({ error: 'No fields to update' });
    return;
  }

  values.push(id, tenantId);

  const result = await query(
    `UPDATE appointments SET ${fields.join(', ')}
     WHERE id = $${idx++} AND tenant_id = $${idx}
     RETURNING *`,
    values
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Appointment not found' });
    return;
  }

  res.json(result.rows[0]);
});

// =============================================
// DELETE /api/appointments/:id
// =============================================

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;

  const result = await query(
    `UPDATE appointments SET status = 'cancelled'
     WHERE id = $1 AND tenant_id = $2 AND status = 'scheduled'
     RETURNING id`,
    [id, tenantId]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Appointment not found or cannot be cancelled' });
    return;
  }

  res.json({ cancelled: true });
});

export default router;
