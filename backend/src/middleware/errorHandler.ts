import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error('❌ Error:', err.message);

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

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

  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
}
