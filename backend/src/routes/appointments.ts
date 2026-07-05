import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

const createAppointmentSchema = z.object({
  contactId: z.string().uuid(),
  service: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  durationMinutes: z.number().int().positive().max(480).default(30),
  notes: z.string().optional(),
});

const updateAppointmentSchema = z.object({
  service: z.string().min(1).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  durationMinutes: z.number().int().positive().max(480).optional(),
  status: z.enum(['scheduled', 'confirmed', 'completed', 'cancelled', 'no_show']).optional(),
  notes: z.string().optional(),
  reminderSent: z.boolean().optional(),
});

// GET /api/appointments
router.get('/', async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;
  const { date, status, contactId } = req.query;

  let sql = `SELECT a.id, a.contact_id, a.service, a.date, a.time,
                    a.duration_minutes, a.status, a.google_event_id,
                    a.reminder_sent, a.notes, a.created_at,
                    ct.name as contact_name, ct.phone as contact_phone
             FROM appointments a
             LEFT JOIN contacts ct ON a.contact_id = ct.id
             WHERE a.tenant_id = $1`;
  const params: unknown[] = [tenantId];
  let idx = 2;

  if (date) {
    sql += ` AND a.date = $${idx++}`;
    params.push(date);
  }
  if (status) {
    sql += ` AND a.status = $${idx++}`;
    params.push(status);
  }
  if (contactId) {
    sql += ` AND a.contact_id = $${idx++}`;
    params.push(contactId);
  }

  sql += ' ORDER BY a.date DESC, a.time DESC';

  const result = await query(sql, params);
  res.json(result.rows);
});

// GET /api/appointments/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;

  const result = await query(
    `SELECT a.id, a.contact_id, a.service, a.date, a.time,
            a.duration_minutes, a.status, a.google_event_id,
            a.reminder_sent, a.notes, a.created_at,
            ct.name as contact_name, ct.phone as contact_phone
     FROM appointments a
     LEFT JOIN contacts ct ON a.contact_id = ct.id
     WHERE a.id = $1 AND a.tenant_id = $2`,
    [id, tenantId]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Appointment not found' });
    return;
  }

  res.json(result.rows[0]);
});

// POST /api/appointments
router.post('/', validate(createAppointmentSchema), async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;
  const { contactId, service, date, time, durationMinutes, notes } = req.body;

  const result = await query(
    `INSERT INTO appointments (tenant_id, contact_id, service, date, time, duration_minutes, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [tenantId, contactId, service, date, time, durationMinutes, notes || null]
  );

  res.status(201).json(result.rows[0]);
});

// PATCH /api/appointments/:id
router.patch('/:id', validate(updateAppointmentSchema), async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;
  const updates: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (req.body.service !== undefined) {
    updates.push(`service = $${idx++}`);
    values.push(req.body.service);
  }
  if (req.body.date !== undefined) {
    updates.push(`date = $${idx++}`);
    values.push(req.body.date);
  }
  if (req.body.time !== undefined) {
    updates.push(`time = $${idx++}`);
    values.push(req.body.time);
  }
  if (req.body.durationMinutes !== undefined) {
    updates.push(`duration_minutes = $${idx++}`);
    values.push(req.body.durationMinutes);
  }
  if (req.body.status !== undefined) {
    updates.push(`status = $${idx++}`);
    values.push(req.body.status);
  }
  if (req.body.notes !== undefined) {
    updates.push(`notes = $${idx++}`);
    values.push(req.body.notes);
  }
  if (req.body.reminderSent !== undefined) {
    updates.push(`reminder_sent = $${idx++}`);
    values.push(req.body.reminderSent);
  }

  if (updates.length === 0) {
    res.status(400).json({ error: 'No fields to update' });
    return;
  }

  values.push(id, tenantId);

  const result = await query(
    `UPDATE appointments SET ${updates.join(', ')}
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

// DELETE /api/appointments/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;

  const result = await query(
    'DELETE FROM appointments WHERE id = $1 AND tenant_id = $2 RETURNING id',
    [id, tenantId]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Appointment not found' });
    return;
  }

  res.json({ message: 'Appointment cancelled successfully' });
});

export default router;