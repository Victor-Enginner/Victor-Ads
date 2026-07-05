import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { query } from '../config/database.js';
import { validate } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

const createDocumentSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  sourceType: z.string().min(1).default('manual'),
  sourceUrl: z.string().url().optional(),
});

// GET /api/documents
router.get('/', async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;

  const result = await query(
    `SELECT id, title, source_type, source_url, chunk_count,
            last_indexed_at, created_at
     FROM documents
     WHERE tenant_id = $1
     ORDER BY created_at DESC`,
    [tenantId]
  );

  res.json(result.rows);
});

// GET /api/documents/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;

  const result = await query(
    `SELECT id, title, content, source_type, source_url, chunk_count,
            last_indexed_at, created_at
     FROM documents
     WHERE id = $1 AND tenant_id = $2`,
    [id, tenantId]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Document not found' });
    return;
  }

  res.json(result.rows[0]);
});

// POST /api/documents
router.post('/', validate(createDocumentSchema), async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId;
  const { title, content, sourceType, sourceUrl } = req.body;

  const result = await query(
    `INSERT INTO documents (tenant_id, title, content, source_type, source_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [tenantId, title, content, sourceType, sourceUrl || null]
  );

  res.status(201).json(result.rows[0]);
});

// DELETE /api/documents/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId;

  const result = await query(
    'DELETE FROM documents WHERE id = $1 AND tenant_id = $2 RETURNING id',
    [id, tenantId]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Document not found' });
    return;
  }

  res.json({ message: 'Document deleted successfully' });
});

export default router;