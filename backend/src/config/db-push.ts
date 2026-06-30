import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './database.js';

// db-push.ts — applies database/schema.sql to the configured DATABASE_URL.
// Run with: npm run db:push  (from the backend folder)

const here = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(here, '../../../database/schema.sql');

async function push() {
  console.log('📜 Reading schema:', schemaPath);
  const sql = readFileSync(schemaPath, 'utf-8');

  try {
    console.log('⏳ Applying schema to the database...');
    await pool.query(sql);
    console.log('✅ Schema applied successfully — all tables are ready.');
  } catch (err) {
    console.error('❌ Failed to apply schema:');
    console.error(err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

push();
