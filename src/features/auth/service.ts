import * as authRepo from './repository';
import { AuthInput, AuthResponse } from './model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redisClient from '../../config/redis';
import { ServiceError, LoginError, SignupError, UserExistsError, LogoutError } from './errors';

const JWT_SECRET = process.env.JWT_SECRET;
const BLACKLIST_PREFIX = 'bl_';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const user = await authRepo.findByEmail(email);
    if (!user) {
      throw new LoginError('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new LoginError('Invalid email or password');
    }

    if (!JWT_SECRET) {
      throw new ServiceError('JWT_SECRET is not configured');
    }

    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '24h' });
    const { password: _, ...userWithoutPassword } = user;

    console.log('Successfully logged in user with email: ', email);

    return {
      token,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error('Unexpected error during login:', error);
    throw new LoginError('Failed to login');
  }
};

export const signup = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const existingUser = await authRepo.findByEmail(email);
    if (existingUser) {
      throw new UserExistsError(email);
    }

    if (!JWT_SECRET) {
      throw new ServiceError('JWT_SECRET is not configured');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authRepo.create({ email, password: hashedPassword });

    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '24h' });
    const { password: _, ...userWithoutPassword } = user;

    console.log('Successfully signed up user with email: ', email);

    return {
      token,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error('Unexpected error during signup:', error);
    if (error instanceof UserExistsError) {
      throw error;
    }
    throw new SignupError('Failed to create account');
  }
};

export const logout = async (token: string): Promise<void> => {
  try {
    await redisClient.set(`${BLACKLIST_PREFIX}${token}`, '1', 'EX', 24 * 60 * 60);
    console.log('Successfully logged out user');
  } catch (error) {
    console.error('Failed to blacklist token:', error);
    throw new LogoutError('Failed to logout');
  }
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  try {
    const exists = await redisClient.get(`${BLACKLIST_PREFIX}${token}`);
    return exists !== null;
  } catch (error) {
    console.error('Failed to check token blacklist:', error);
    throw new ServiceError('Failed to verify token status');
  }
};
