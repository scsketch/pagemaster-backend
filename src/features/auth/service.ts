import * as authRepo from './repository';
import { AuthInput, AuthResponse } from './model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redisClient from '../../config/redis';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '24h';
const BLACKLIST_PREFIX = 'bl_';

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

export const logout = async (token: string): Promise<void> => {
  try {
    // Verify the token to ensure it's valid before blacklisting
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Get token expiration time
    const decodedToken = jwt.decode(token) as { exp: number };
    const expiresIn = decodedToken.exp - Math.floor(Date.now() / 1000);

    if (expiresIn > 0) {
      // Add token to blacklist with the same expiration time
      await redisClient.set(`${BLACKLIST_PREFIX}${token}`, '1', 'EX', expiresIn);
    }
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  const exists = await redisClient.get(`${BLACKLIST_PREFIX}${token}`);
  return exists !== null;
};
