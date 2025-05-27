import { Book, BookDetail, CreateBookInput, UpdateBookInput } from '../model';
import { BookRepository, PaginationParams, PaginatedResult } from '../repository/repository';
import { v4 as uuidv4 } from 'uuid';

export class MockBookRepository implements BookRepository {
  private books: BookDetail[] = [];

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Book>> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const search = params?.search?.toLowerCase();
    const genre = params?.genre?.toLowerCase();

    let filteredBooks = [...this.books];

    if (search) {
      filteredBooks = filteredBooks.filter(
        (book) => book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search),
      );
    }

    if (genre) {
      filteredBooks = filteredBooks.filter((book) => book.genre.toLowerCase() === genre);
    }

    const total = filteredBooks.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedBooks = filteredBooks.slice(start, end);

    return {
      data: paginatedBooks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<BookDetail | null> {
    return this.books.find((book) => book.bookId === id) || null;
  }

  async create(data: CreateBookInput): Promise<BookDetail> {
    const newBook: BookDetail = {
      bookId: uuidv4(),
      ...data,
      description: data.description || '',
    };
    this.books.push(newBook);
    return newBook;
  }

  async update(id: string, data: UpdateBookInput): Promise<BookDetail> {
    const index = this.books.findIndex((book) => book.bookId === id);
    if (index === -1) {
      throw new Error('Book not found');
    }

    const updatedBook = {
      ...this.books[index],
      ...data,
    };
    this.books[index] = updatedBook;
    return updatedBook;
  }

  async remove(id: string): Promise<void> {
    const index = this.books.findIndex((book) => book.bookId === id);
    if (index === -1) {
      throw new Error('Book not found');
    }
    this.books.splice(index, 1);
  }

  async clear(): Promise<void> {
    this.books = [];
  }
}
