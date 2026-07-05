import { Router, Request, Response } from 'express';
import { query } from '../config/database.js';
import { authMiddleware } from '../middleware/auth.js';
import { chatCompletion } from '../services/openrouter.js';
import { retrieveRelevantDocuments } from '../services/rag.js';

const router = Router();
router.use(authMiddleware);

// POST /api/chat - AI endpoint real
router.post('/', async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;
  const { message, conversationId, context } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  // Se conversationId fornecido, validar que pertence ao tenant
  if (conversationId) {
    const conv = await query(
      'SELECT id FROM conversations WHERE id = $1 AND tenant_id = $2',
      [conversationId, tenantId]
    );

    if (conv.rows.length === 0) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }
  }

  try {
    // 1. Recuperar contexto RAG
    const docs = await retrieveRelevantDocuments(tenantId!, message);
    const contextText = docs.map(d => d.content).join('\n\n');

    // 2. Montar mensagens para o LLM
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      {
        role: 'system',
        content: `You are a helpful assistant for a dental clinic. Use the following knowledge base to answer questions accurately. If you don't know the answer, say so politely.\n\nKnowledge Base:\n${contextText || 'No documents available.'}`,
      },
      {
        role: 'user',
        content: message,
      },
    ];

    // 3. Chamar OpenRouter
    const start = Date.now();
    const content = await chatCompletion(messages);
    const duration = Date.now() - start;

    // 4. Salvar mensagem do usuário
    const userMsg = await query(
      `INSERT INTO messages (conversation_id, tenant_id, role, content, model)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [conversationId ?? null, tenantId, 'user', message, 'openrouter']
    );

    // 5. Salvar resposta da AI
    const aiMsg = await query(
      `INSERT INTO messages (conversation_id, tenant_id, role, content, token_count, model)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [conversationId ?? null, tenantId, 'assistant', content, Math.floor(content.length / 4), 'openrouter']
    );

    res.json({
      id: aiMsg.rows[0].id,
      conversationId: conversationId || null,
      role: 'assistant',
      content,
      model: 'openrouter',
      createdAt: aiMsg.rows[0].created_at,
      latencyMs: duration,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// GET /api/chat/conversations
router.get('/conversations', async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;

  const result = await query(
    `SELECT c.id, c.contact_id, c.status, c.intent, c.assigned_to,
            c.started_at, c.ended_at,
            ct.name as contact_name, ct.phone as contact_phone,
            COUNT(m.id) as message_count
     FROM conversations c
     LEFT JOIN contacts ct ON c.contact_id = ct.id
     LEFT JOIN messages m ON m.conversation_id = c.id
     WHERE c.tenant_id = $1
     GROUP BY c.id, ct.name, ct.phone
     ORDER BY c.started_at DESC`,
    [tenantId]
  );

  res.json(result.rows);
});

export default router;