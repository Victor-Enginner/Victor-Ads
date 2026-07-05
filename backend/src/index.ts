import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import pool from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { swaggerUi, swaggerRouter } from './config/swagger.js';
import logger from './utils/logger.js';

// Routes
import authRoutes from './routes/auth.js';
import tenantRoutes from './routes/tenants.js';
import contactRoutes from './routes/contacts.js';
import appointmentRoutes from './routes/appointments.js';
import conversationRoutes from './routes/conversations.js';
import messageRoutes from './routes/messages.js';
import documentRoutes from './routes/documents.js';
import subscriptionRoutes from './routes/subscriptions.js';
import chatRoutes from './routes/chat.js';

const app = express();

// =============================================
// LOGGING
// =============================================

app.use((req, _res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
  }, 'Incoming request');
  next();
});

// =============================================
// MIDDLEWARE
// =============================================

app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    logger.error({ error }, 'Database health check failed');
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

// =============================================
// SWAGGER DOCS
// =============================================

app.use('/api/docs', swaggerUi, swaggerRouter);

// =============================================
// ROUTES
// =============================================

app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/chat', chatRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// =============================================
// START
// =============================================

async function start() {
  // Test database connection
  try {
    await pool.query('SELECT NOW()');
    logger.info('Database connected');
  } catch (error) {
    logger.error({ error }, 'Database connection failed');
    process.exit(1);
  }

  app.listen(env.PORT, () => {
    logger.info({
      url: `http://localhost:${env.PORT}`,
      docs: `http://localhost:${env.PORT}/api/docs`,
      env: env.NODE_ENV,
    }, '🚀 Aurai API started');
  });
}

start();
