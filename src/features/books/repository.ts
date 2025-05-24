import prisma from '../../lib/prisma'; // TODO: make it so db operation is generic
import { Book, BookInput } from './model';

export const findAll = () => {
  return prisma.book.findMany();
};

export const findById = (id: string) => {
  return prisma.book.findUnique({ where: { bookId: id } });
};

export const create = (data: BookInput) => {
  return prisma.book.create({ data });
};

export const update = (id: string, data: BookInput) => {
  return prisma.book.update({ where: { bookId: id }, data });
};

export const remove = (id: string) => {
  return prisma.book.delete({ where: { bookId: id } });
};
