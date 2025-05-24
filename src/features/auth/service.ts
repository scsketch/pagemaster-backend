import * as authRepo from './repository';
import { AuthInput, AuthResponse } from './model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const user = await authRepo.findByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '24h' });
  const { password: _, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword,
  };
};

export const signup = async (email: string, password: string): Promise<AuthResponse> => {
  const existingUser = await authRepo.findByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await authRepo.create({ email, password: hashedPassword });

  const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '24h' });
  const { password: _, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword,
  };
};
