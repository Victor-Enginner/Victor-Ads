import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  logger.error({
    error: err.message,
    stack: err.stack,
  }, 'Unhandled error');

  // PostgreSQL unique violation
  if ((err as any).code === '23505') {
    res.status(409).json({ error: 'Resource already exists' });
    return;
  }

  // PostgreSQL foreign key violation
  if ((err as any).code === '23503') {
    res.status(400).json({ error: 'Referenced resource not found' });
    return;
  }

  // Zod validation error (se não pego pelo middleware)
  if (err.name === 'ZodError') {
    res.status(400).json({ error: 'Validation failed', details: (err as any).errors });
    return;
  }

  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
}
