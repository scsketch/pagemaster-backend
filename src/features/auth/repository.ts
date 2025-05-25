import prisma from '../../config/prisma';
import { RepositoryError } from './errors';
import { User, AuthInput } from './model';

export const findByEmail = async (email: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error: unknown) {
    console.error(`Database error while finding user with email ${email}:`, error);
    throw new RepositoryError('Failed to find user');
  }
};

export const create = async (data: AuthInput): Promise<User> => {
  try {
    return await prisma.user.create({ data });
  } catch (error: unknown) {
    console.error('Database error while creating user:', error);
    throw new RepositoryError('Failed to create user');
  }
};
