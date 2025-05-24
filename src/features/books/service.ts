import * as bookRepo from './repository';
import { BookInput } from './model';

export const getAllBooks = () => {
  return bookRepo.findAll();
};

export const getBookById = (id: string) => {
  return bookRepo.findById(id);
};

export const createBook = (data: BookInput) => {
  return bookRepo.create(data);
};

export const updateBook = (id: string, data: BookInput) => {
  return bookRepo.update(id, data);
};

export const deleteBook = (id: string) => {
  return bookRepo.remove(id);
};
