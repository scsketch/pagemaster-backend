import { Request, Response } from 'express';
import { BookService } from './service';
import { CreateBookInput, UpdateBookInput } from './model';
import { BookError, BookNotFoundError } from './errors';

export class BookController {
  constructor(private readonly bookService: BookService) {}

  getBooks = async (req: Request, res: Response) => {
    try {
      const books = await this.bookService.getBooks();
      res.json(books);
    } catch (error) {
      console.error('Error in getBooks:', error);
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  };

  getBookById = async (req: Request, res: Response) => {
    try {
      const book = await this.bookService.getBookById(req.params.id);
      res.json(book);
    } catch (error) {
      console.error('Error in getBookById:', error);
      if (error instanceof BookNotFoundError) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.status(500).json({ error: 'Failed to fetch book' });
      }
    }
  };

  createBook = async (req: Request, res: Response) => {
    try {
      const bookData: CreateBookInput = req.body;
      const newBook = await this.bookService.createBook(bookData);
      res.status(201).json(newBook);
    } catch (error) {
      console.error('Error in createBook:', error);
      if (error instanceof BookError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create book' });
      }
    }
  };

  updateBook = async (req: Request, res: Response) => {
    try {
      const bookData: UpdateBookInput = req.body;
      const updatedBook = await this.bookService.updateBook(req.params.id, bookData);
      res.json(updatedBook);
    } catch (error) {
      console.error('Error in updateBook:', error);
      if (error instanceof BookNotFoundError) {
        res.status(404).json({ error: 'Book not found' });
      } else if (error instanceof BookError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to update book' });
      }
    }
  };

  deleteBook = async (req: Request, res: Response) => {
    try {
      await this.bookService.deleteBook(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error in deleteBook:', error);
      if (error instanceof BookError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to delete book' });
      }
    }
  };
}
