import { Router } from 'express';
import { RequestHandler } from 'express';
import { createAuthMiddleware } from './middleware/auth';
import { createRouter as createBooksRouter } from './features/books';
import { createRouter as createAuthRouter } from './features/auth';
import { AuthFactory } from './features/auth/factory';
import { BookFactory } from './features/books/factory';

const apiRouter = Router();

// Controllers
const authController = AuthFactory.getController();
const booksController = BookFactory.getController();

// Routers
const authRouter = createAuthRouter(authController);
const booksRouter = createBooksRouter(booksController);

// Public routes
apiRouter.use('/auth', authRouter);

// Protected routes
const authMiddleware = createAuthMiddleware(authController.getService());

apiRouter.use('/books', authMiddleware as RequestHandler, booksRouter);

export { apiRouter };
