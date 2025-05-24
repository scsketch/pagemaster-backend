import { Router } from 'express';
import * as booksController from './books.controller';

const router = Router();

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createBook);
router.patch('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

export default router;
