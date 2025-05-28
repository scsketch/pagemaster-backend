import { Book, BookDetail, CreateBookInput, UpdateBookInput } from './model';
import { BookError, BookNotFoundError, RepositoryError, RecordNotFoundError } from './errors';
import { BookRepository, PaginationParams, PaginatedResult } from './repository/repository';

export class BookService {
  constructor(private readonly repository: BookRepository) {}

  async getBooks(params?: PaginationParams): Promise<PaginatedResult<Book>> {
    try {
      return await this.repository.findAll(params);
    } catch (error) {
      console.error('Error while fetching books:', error);
      throw new BookError('Failed to fetch books');
    }
  }

  async getBookById(id: string): Promise<BookDetail> {
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

      // Only update the fields that are provided in the request body
      const updateData = {
        title: data.title,
        author: data.author,
        genre: data.genre,
        price: data.price,
        description: data.description,
      };

      return await this.repository.update(id, updateData);
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
        throw new BookNotFoundError(id);
      }
      console.error('Error deleting book:', error);
      if (error instanceof RepositoryError) {
        throw new BookError('Failed to delete book');
      }
      throw error;
    }
  }
}
