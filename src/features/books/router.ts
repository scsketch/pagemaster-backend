import { Router } from 'express';
import { BookFactory } from './factory';
import { BookController } from './controller';
import { bookValidation, paginationValidation } from './validation';

export const createRouter = (controller: BookController): Router => {
  const router = Router();

  router.get('/', paginationValidation, controller.getBooks);
  router.get('/:id', controller.getBookById);
  router.post('/', bookValidation, controller.createBook);
  router.put('/:id', bookValidation, controller.updateBook);
  router.delete('/:id', controller.deleteBook);

  return router;
};
