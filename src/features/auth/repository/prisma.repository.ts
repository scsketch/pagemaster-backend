import prisma from '../../../config/prisma';
import { AuthRepository } from './repository';
import { User, UserInput } from '../model';
import { RepositoryError } from '../errors';

// Helper function to convert Prisma user to our User interface
const convertPrismaUser = (prismaUser: any): User => ({
  userId: prismaUser.userId,
  email: prismaUser.email,
  password: prismaUser.password,
  createdAt: prismaUser.createdAt,
  updatedAt: prismaUser.updatedAt,
});

export class PrismaAuthRepository implements AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      return user ? convertPrismaUser(user) : null;
    } catch (error: unknown) {
      console.error(`Database error while finding user with email ${email}:`, error);
      throw new RepositoryError('Failed to find user');
    }
  }

  async create(data: UserInput): Promise<User> {
    try {
      const user = await prisma.user.create({ data });
      return convertPrismaUser(user);
    } catch (error: unknown) {
      console.error('Database error while creating user:', error);
      throw new RepositoryError('Failed to create user');
    }
  }
}
