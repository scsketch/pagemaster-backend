import { Router, Request, Response } from 'express';
import booksRouter from './features/books/books.routes';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

router.use('/books', booksRouter);

export default router;
