import { CreateBookInput, UpdateBookInput } from './model';
import { BookError, BookNotFoundError, RepositoryError, RecordNotFoundError } from './errors';
import { BookRepository, PaginationParams, PaginatedResult } from './repository/repository';

export class BookService {
  constructor(private readonly repository: BookRepository) {}

  async getBooks(params?: PaginationParams) {
    try {
      return await this.repository.findAll(params);
    } catch (error) {
      console.error('Error while fetching books:', error);
      throw new BookError('Failed to fetch books');
    }
  }

  async getBookById(id: string) {
    try {
      const book = await this.repository.findById(id);
      if (!book) {
        throw new BookNotFoundError(id);
      }
      return book;
    } catch (error) {
      console.error('Error finding book:', error);
      if (error instanceof BookNotFoundError) {
        throw error;
      }
      throw new BookError('Failed to find book');
    }
  }

  async createBook(data: CreateBookInput) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      console.error('Error creating book:', error);
      throw new BookError('Failed to create book');
    }
  }

  async updateBook(id: string, data: UpdateBookInput) {
    try {
      const existingBook = await this.repository.findById(id);
      if (!existingBook) {
        throw new BookNotFoundError(id);
      }

      const completeData = {
        ...existingBook,
        ...data,
        bookId: id,
      };

      return await this.repository.update(id, completeData);
    } catch (error) {
      console.error('Error updating book:', error);
      if (error instanceof BookNotFoundError) {
        throw error;
      }
      throw new BookError('Failed to update book');
    }
  }

  async deleteBook(id: string) {
    try {
      await this.repository.remove(id);
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        console.log(`Book with id ${id} not found during deletion`);
        return;
      }
      console.error('Error deleting book:', error);
      if (error instanceof RepositoryError) {
        throw new BookError('Failed to delete book');
      }
      throw error;
    }
  }
}
