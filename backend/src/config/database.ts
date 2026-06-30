import pg from 'pg';
import { env } from './env.js';

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(1);
});

export async function query<T extends pg.QueryResultRow = any>(
  text: string,
  params?: unknown[]
): Promise<pg.QueryResult<T>> {
  const start = Date.now();
  const result = await pool.query<T>(text, params);
  const duration = Date.now() - start;

  if (env.NODE_ENV === 'development' && duration > 100) {
    console.log(`⏱️  Slow query (${duration}ms):`, text.substring(0, 80));
  }

  return result;
}

export async function getClient(): Promise<pg.PoolClient> {
  return pool.connect();
}

export default pool;
