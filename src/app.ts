import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiRouter } from './routes';
import { errorHandler, notFoundHandler } from './middleware';
const cookieParser = require('cookie-parser');

const app = express();

// Configuration
app.use(
  helmet({
    hsts: process.env.NODE_ENV === 'production',
  }),
);
app.use(
  cors({
    origin: 'http://localhost:8081', // frontend URL
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

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
