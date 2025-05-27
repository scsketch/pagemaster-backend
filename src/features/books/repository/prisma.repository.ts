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
  id: prismaBook.id,
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
      const search = params?.search;
      const genre = params?.genre;

      const where = {
        AND: [
          // Search condition
          search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' as const } },
                  { author: { contains: search, mode: 'insensitive' as const } },
                ],
              }
            : {},
          // Genre condition
          genre ? { genre: { equals: genre, mode: 'insensitive' as const } } : {},
        ],
      };

      // First get the total count of matching records
      const total = await prisma.book.count({ where });

      // Then get the paginated results
      const books = await prisma.book.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      });

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
      const book = await prisma.book.findUnique({ where: { id: id } });
      return book ? convertPrismaBookDetail(book) : null;
    } catch (error: unknown) {
      console.error(`Database error while finding book with id ${id}:`, error);
      throw new RepositoryError('Failed to find book');
    }
  }

  async create(data: CreateBookInput): Promise<BookDetail> {
    try {
      const book = await prisma.book.create({ data });
      console.log('book: ', book);
      return convertPrismaBookDetail(book);
    } catch (error: unknown) {
      console.error('Database error while creating book:', error);
      throw new RepositoryError('Failed to create book');
    }
  }

  async update(id: string, data: UpdateBookInput): Promise<BookDetail> {
    try {
      const book = await prisma.book.update({ where: { id: id }, data });
      return convertPrismaBookDetail(book);
    } catch (error: unknown) {
      console.error(`Database error while updating book with id ${id}:`, error);
      throw new RepositoryError('Failed to update book');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await prisma.book.delete({ where: { id: id } });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
        throw new RecordNotFoundError(id);
      }
      console.error(`Database error while deleting book with id ${id}:`, error);
      throw new RepositoryError('Failed to delete book');
    }
  }
}
