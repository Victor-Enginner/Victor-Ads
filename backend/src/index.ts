import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import pool from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

// Routes
import authRoutes from './routes/auth.js';
import tenantRoutes from './routes/tenants.js';
import contactRoutes from './routes/contacts.js';
import appointmentRoutes from './routes/appointments.js';

const app = express();

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
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

// =============================================
// ROUTES
// =============================================

app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/appointments', appointmentRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// =============================================
// START
// =============================================

async function start() {
  // Test database connection
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }

  app.listen(env.PORT, () => {
    console.log(`🚀 Aurai API running on http://localhost:${env.PORT}`);
    console.log(`📡 Environment: ${env.NODE_ENV}`);
  });
}

start();
