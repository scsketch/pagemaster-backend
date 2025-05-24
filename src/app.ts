import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiRouter } from './routes';
import { errorHandler, notFoundHandler } from './middlewares';

const app = express();

// Configuration
app.use(
  helmet({
    hsts: process.env.NODE_ENV === 'production',
  }),
);
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// API routes
app.use('/api/v1', apiRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
