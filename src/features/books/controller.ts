import { Request, Response } from 'express';
import * as service from './service';
import { BookNotFoundError } from './errors';

export const getBooks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const books = await service.getBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const book = await service.getBookById(id);
    res.status(200).json(book);
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    if (error instanceof BookNotFoundError) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.status(500).json({ message: 'Error fetching book' });
    }
  }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await service.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Error creating book' });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const book = await service.updateBook(id, req.body);
    res.status(200).json(book);
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    if (error instanceof BookNotFoundError) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.status(500).json({ message: 'Error updating book' });
    }
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await service.deleteBook(id);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    res.status(500).json({ message: 'Error deleting book' });
  }
};
