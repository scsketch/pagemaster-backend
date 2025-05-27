import { Router } from 'express';
import { RequestHandler } from 'express';
import { createAuthMiddleware } from './middleware/auth';
import { createRouter as createBooksRouter } from './features/books';
import { createRouter as createAuthRouter } from './features/auth';
import { AuthFactory } from './features/auth/factory';
import { BookFactory } from './features/books/factory';

const apiRouter = Router();

const authFactory = new AuthFactory();
const booksFactory = new BookFactory();

// Auth middleware
const authMiddleware = createAuthMiddleware();

// Routers
const authRouter = createAuthRouter(authFactory.getController(), authMiddleware as RequestHandler);
const booksRouter = createBooksRouter(booksFactory.getController());

// Public routes
apiRouter.use('/auth', authRouter);

// Protected routes
apiRouter.use('/books', authMiddleware as RequestHandler, booksRouter);

export { apiRouter };
