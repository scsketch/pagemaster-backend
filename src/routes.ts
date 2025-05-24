import { Router } from 'express';
import { RequestHandler } from 'express';
import { authenticateToken } from './middleware/auth';
import booksRouter from './features/books/routes';
import authRouter from './features/auth/routes';

// API
const apiRouter = Router();

// Public routes
apiRouter.use('/auth', authRouter);

// Protected routes
apiRouter.use('/books', authenticateToken as RequestHandler, booksRouter);

export { apiRouter };
