import prisma from '../../prisma';
import { User, AuthInput } from './model';

export const findByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const create = (data: AuthInput) => {
  return prisma.user.create({ data });
};
