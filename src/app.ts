import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes';
import { errorHandler, notFoundHandler } from './middleware';
import { securityMiddleware } from './middleware/security';
import { routeLogger } from './middleware/logging';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();

// Enable CORS for all routes
app.use(cors());

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

// API Documentation - only available in development
if (process.env.NODE_ENV === 'development') {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        showCommonExtensions: true,
        docExpansion: 'none',
      },
    }),
  );
}

// API
app.use('/api/v1', apiRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
