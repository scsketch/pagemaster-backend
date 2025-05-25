import { RequestHandler, Router } from 'express';
import { BookFactory } from './factory';
import { authenticateToken } from '../../middleware/auth';

const router = Router();
const controller = BookFactory.getController();

// Protected routes
router.use(authenticateToken as RequestHandler);
router.get('/', controller.getBooks);
router.get('/:id', controller.getBookById);
router.post('/', controller.createBook);
router.put('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);

export default router;
