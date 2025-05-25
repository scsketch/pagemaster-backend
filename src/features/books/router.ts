import { RequestHandler, Router } from 'express';
import { BookFactory } from './factory';
import { BookController } from './controller';

export const createRouter = (controller: BookController): Router => {
  const router = Router();

  router.get('/', controller.getBooks);
  router.get('/:id', controller.getBookById);
  router.post('/', controller.createBook);
  router.patch('/:id', controller.updateBook);
  router.delete('/:id', controller.deleteBook);

  return router;
};
