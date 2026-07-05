import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

const createMessageSchema = z.object({
  content: z.string().min(1),
  role: z.enum(['user', 'assistant', 'system', 'tool']).default('user'),
  toolCalls: z.any().optional(),
  tokenCount: z.number().int().positive().optional(),
  model: z.string().optional(),
});

// GET /api/messages/conversation/:conversationId
router.get('/conversation/:conversationId', async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const tenantId = req.user!.tenantId;

  const result = await query(
    `SELECT id, conversation_id, role, content, tool_calls, token_count, model, created_at
     FROM messages
     WHERE conversation_id = $1 AND tenant_id = $2
     ORDER BY created_at ASC`,
    [conversationId, tenantId]
  );

  res.json(result.rows);
});

// POST /api/messages
router.post('/', validate(createMessageSchema), async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;
  const { conversationId, content, role, toolCalls, tokenCount, model } = req.body;

  if (!conversationId) {
    res.status(400).json({ error: 'conversationId is required' });
    return;
  }

  const conversation = await query(
    'SELECT id FROM conversations WHERE id = $1 AND tenant_id = $2',
    [conversationId, tenantId]
  );

  if (conversation.rows.length === 0) {
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  const result = await query(
    `INSERT INTO messages (conversation_id, tenant_id, role, content, tool_calls, token_count, model)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [conversationId, tenantId, role, content, toolCalls || null, tokenCount || 0, model || null]
  );

  res.status(201).json(result.rows[0]);
});

export default router;