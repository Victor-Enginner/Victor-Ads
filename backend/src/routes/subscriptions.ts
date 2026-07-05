import { Router, Request, Response } from 'express';
import { query } from '../config/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// GET /api/subscriptions
router.get('/', async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;

  const result = await query(
    `SELECT id, plan, status, message_limit, messages_used,
            current_period_start, current_period_end, created_at
     FROM subscriptions
     WHERE tenant_id = $1
     ORDER BY current_period_start DESC
     LIMIT 1`,
    [tenantId]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'No subscription found' });
    return;
  }

  res.json(result.rows[0]);
});

// POST /api/subscriptions/webhook (Mercado Pago / Stripe)
router.post('/webhook', async (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === 'payment.updated' || type === 'subscription.updated') {
    const externalId = data?.id;

    if (!externalId) {
      res.status(400).json({ error: 'Missing payment ID' });
      return;
    }

    const result = await query(
      'UPDATE subscriptions SET status = $1, mercadopago_id = $2 WHERE mercadopago_id = $3 RETURNING id',
      ['active', externalId, externalId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Subscription not found' });
      return;
    }

    res.json({ message: 'Subscription updated' });
    return;
  }

  res.json({ message: 'Webhook received' });
});

export default router;