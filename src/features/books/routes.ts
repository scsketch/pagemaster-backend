import { Router, RequestHandler } from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from './controller';
import { authenticateToken } from '../../middleware/auth';

const router = Router();

// All routes are protected with authentication
router.use(authenticateToken as RequestHandler);

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
