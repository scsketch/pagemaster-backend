import prisma from '../../config/prisma'; // TODO: make it so db operation is generic
import { RepositoryError, RecordNotFoundError } from './errors';
import { Book, BookInput } from './model';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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

export const findAll = async (): Promise<Book[]> => {
  try {
    const books = await prisma.book.findMany();
    return books.map(convertPrismaBook);
  } catch (error: unknown) {
    console.error('Database error while fetching all books:', error);
    throw new RepositoryError('Failed to fetch books');
  }
};

export const findById = async (id: string): Promise<Book | null> => {
  try {
    const book = await prisma.book.findUnique({ where: { bookId: id } });
    return book ? convertPrismaBook(book) : null;
  } catch (error: unknown) {
    console.error(`Database error while finding book with id ${id}:`, error);
    throw new RepositoryError('Failed to find book');
  }
};

export const create = async (data: BookInput): Promise<Book> => {
  try {
    const book = await prisma.book.create({ data });
    return convertPrismaBook(book);
  } catch (error: unknown) {
    console.error('Database error while creating book:', error);
    throw new RepositoryError('Failed to create book');
  }
};

export const update = async (id: string, data: BookInput): Promise<Book> => {
  try {
    const book = await prisma.book.update({ where: { bookId: id }, data });
    return convertPrismaBook(book);
  } catch (error: unknown) {
    console.error(`Database error while updating book with id ${id}:`, error);
    throw new RepositoryError('Failed to update book');
  }
};

export const remove = async (id: string): Promise<void> => {
  try {
    await prisma.book.delete({ where: { bookId: id } });
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError && error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
      throw new RecordNotFoundError(id);
    }
    console.error(`Database error while deleting book with id ${id}:`, error);
    throw new RepositoryError('Failed to delete book');
  }
};
