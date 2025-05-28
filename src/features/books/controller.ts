import { Request, Response } from 'express';
import { BookService } from './service';
import { CreateBookInput, UpdateBookInput } from './model';
import { BookError, BookNotFoundError } from './errors';
import { PaginationParams } from './repository/repository';

export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * @swagger
   * /books:
   *   get:
   *     summary: Get all books with pagination and filtering
   *     tags: [Books]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Page number
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Items per page
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Search term for title or author
   *       - in: query
   *         name: genre
   *         schema:
   *           type: string
   *         description: Filter by genre
   *     responses:
   *       200:
   *         description: List of books
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BookResponse'
   *       401:
   *         description: Unauthorized - Invalid or missing token
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       400:
   *         description: Invalid pagination parameters
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  getBooks = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string | undefined;
      const genre = req.query.genre as string | undefined;

      const params: PaginationParams = { page, limit, search, genre };
      const result = await this.bookService.getBooks(params);
      res.json(result);
    } catch (error) {
      console.error('Error in getBooks:', error);
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  };

  /**
   * @swagger
   * /books/{id}:
   *   get:
   *     summary: Get a book by ID
   *     tags: [Books]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Book ID
   *     responses:
   *       200:
   *         description: Book details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       401:
   *         description: Unauthorized - Invalid or missing token
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Book not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
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

  /**
   * @swagger
   * /books:
   *   post:
   *     summary: Create a new book
   *     tags: [Books]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BookInput'
   *     responses:
   *       201:
   *         description: Book created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       401:
   *         description: Unauthorized - Invalid or missing token
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       400:
   *         description: Invalid input
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
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

  /**
   * @swagger
   * /books/{id}:
   *   put:
   *     summary: Update a book (complete replacement)
   *     tags: [Books]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Book ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BookInput'
   *     responses:
   *       200:
   *         description: Book updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       401:
   *         description: Unauthorized - Invalid or missing token
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       400:
   *         description: Invalid input
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Book not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
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

  /**
   * @swagger
   * /books/{id}:
   *   delete:
   *     summary: Delete a book
   *     tags: [Books]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Book ID
   *     responses:
   *       204:
   *         description: Book deleted successfully
   *       401:
   *         description: Unauthorized - Invalid or missing token
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       400:
   *         description: Invalid request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Book not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  deleteBook = async (req: Request, res: Response) => {
    try {
      await this.bookService.deleteBook(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error in deleteBook:', error);
      if (error instanceof BookNotFoundError) {
        res.status(404).json({ error: 'Book not found' });
      } else if (error instanceof BookError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to delete book' });
      }
    }
  };
}
