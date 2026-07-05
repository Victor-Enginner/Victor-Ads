import { query } from '../config/database.js';
import { env } from '../config/env.js';

interface DocumentChunk {
  id: string;
  content: string;
  metadata: Record<string, any>;
}

export async function retrieveRelevantDocuments(tenantId: string, queryText: string, maxResults = 3): Promise<DocumentChunk[]> {
  // Simple keyword-based search (RAG with pgvector would be better but requires pgvector extension)
  const result = await query(
    `SELECT id, content, metadata
     FROM documents
     WHERE tenant_id = $1
       AND (LOWER(title) LIKE LOWER($2) OR LOWER(content) LIKE LOWER($2))
     ORDER BY created_at DESC
     LIMIT $3`,
    [tenantId, `%${queryText.split(' ').pop()}%`, maxResults]
  );

  return result.rows.map(row => ({
    id: row.id,
    content: row.content,
    metadata: row.metadata || {},
  }));
}