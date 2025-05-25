import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiRouter } from './routes';
import { errorHandler, notFoundHandler } from './middleware';
import { securityMiddleware } from './middleware/security';
import { routeLogger } from './middleware/logging';

const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Apply logging middleware
app.use(routeLogger);

// Apply security middleware
app.use(securityMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// API
app.use('/api/v1', apiRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
