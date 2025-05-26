import prisma from '../../../config/prisma';
import { BookRepository, PaginationParams, PaginatedResult } from './repository';
import { Book, BookDetail, CreateBookInput, UpdateBookInput } from '../model';
import { RepositoryError, RecordNotFoundError } from '../errors';
import { PrismaClientKnownRequestError } from '../../../../generated/prisma/runtime/library';

const PRISMA_ERROR_CODES = {
  RECORD_NOT_FOUND: 'P2025',
} as const;

// Helper function to convert Prisma book to our Book interface
const convertPrismaBook = (prismaBook: any): Book => ({
  bookId: prismaBook.bookId,
  title: prismaBook.title,
  author: prismaBook.author,
  genre: prismaBook.genre,
  price: Number(prismaBook.price),
});

const convertPrismaBookDetail = (prismaBook: any): BookDetail => ({
  ...convertPrismaBook(prismaBook),
  description: prismaBook.description,
});

export class PrismaBookRepository implements BookRepository {
  async findAll(params?: PaginationParams): Promise<PaginatedResult<Book>> {
    try {
      const page = params?.page ?? 1;
      const limit = params?.limit ?? 10;
      const skip = (page - 1) * limit;

      const [books, total] = await Promise.all([
        prisma.book.findMany({
          skip,
          take: limit,
          orderBy: { id: 'asc' },
        }),
        prisma.book.count(),
      ]);

      return {
        data: books.map(convertPrismaBook),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error: unknown) {
      console.error('Database error while fetching all books:', error);
      throw new RepositoryError('Failed to fetch books');
    }
  }

  async findById(id: string): Promise<BookDetail | null> {
    try {
      const book = await prisma.book.findUnique({ where: { bookId: id } });
      return book ? convertPrismaBookDetail(book) : null;
    } catch (error: unknown) {
      console.error(`Database error while finding book with id ${id}:`, error);
      throw new RepositoryError('Failed to find book');
    }
  }

  async create(data: CreateBookInput): Promise<BookDetail> {
    try {
      const book = await prisma.book.create({ data });
      return convertPrismaBookDetail(book);
    } catch (error: unknown) {
      console.error('Database error while creating book:', error);
      throw new RepositoryError('Failed to create book');
    }
  }

  async update(id: string, data: UpdateBookInput): Promise<BookDetail> {
    try {
      const book = await prisma.book.update({ where: { bookId: id }, data });
      return convertPrismaBookDetail(book);
    } catch (error: unknown) {
      console.error(`Database error while updating book with id ${id}:`, error);
      throw new RepositoryError('Failed to update book');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await prisma.book.delete({ where: { bookId: id } });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
        throw new RecordNotFoundError(id);
      }
      console.error(`Database error while deleting book with id ${id}:`, error);
      throw new RepositoryError('Failed to delete book');
    }
  }
}
