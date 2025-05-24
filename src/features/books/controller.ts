import { Request, Response } from 'express';
import * as bookService from './service';

export const getAllBooks = async (_req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.status(200).json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await bookService.getBookById(id);
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
  res.status(200).json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const book = await bookService.createBook(req.body);
  res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await bookService.updateBook(id, req.body);
  res.status(200).json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  await bookService.deleteBook(id);
  res.status(204).send();
};
