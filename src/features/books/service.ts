import * as bookRepo from './repository';
import { BookInput } from './model';
import { BookError, BookNotFoundError } from './errors';
import { RepositoryError, RecordNotFoundError } from './errors';

export const getBooks = async () => {
  try {
    return await bookRepo.findAll();
  } catch (error) {
    console.error('Error while fetching books:', error);
    throw new BookError('Failed to fetch books');
  }
};

export const getBookById = async (id: string) => {
  try {
    const book = await bookRepo.findById(id);
    if (!book) {
      throw new BookNotFoundError(`Could not find book with id: ${id}`);
    }
    return book;
  } catch (error) {
    console.error('Error finding book:', error);
    if (error instanceof BookNotFoundError) {
      throw error;
    }
    throw new BookError('Failed to find book');
  }
};

export const createBook = async (data: BookInput) => {
  try {
    return await bookRepo.create(data);
  } catch (error) {
    console.error('Error creating book:', error);
    throw new BookError('Failed to create book');
  }
};

export const updateBook = async (id: string, data: BookInput) => {
  try {
    // Check if book exists
    const existingBook = await bookRepo.findById(id);
    if (!existingBook) {
      throw new BookNotFoundError(id);
    }

    // Ensure we're doing a complete update by merging with existing data
    const completeData = {
      ...existingBook,
      ...data,
      bookId: id, // Ensure ID doesn't change
    };

    return await bookRepo.update(id, completeData);
  } catch (error) {
    console.error('Error updating book:', error);
    if (error instanceof BookNotFoundError) {
      throw error;
    }
    throw new BookError('Failed to update book');
  }
};

export const deleteBook = async (id: string) => {
  try {
    await bookRepo.remove(id);
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
};
