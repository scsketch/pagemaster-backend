import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './repository/';
import { User, UserInput } from './model';
import { UserExistsError, InvalidCredentialsError, LoginError, SignupError, LogoutError, AuthError } from './errors';
import redisClient from '../../config/redis';

const BLACKLIST_PREFIX = 'bl_';
const TOKEN_EXPIRATION = '24h';

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  login = async (email: string, password: string): Promise<{ token: string; user: User }> => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('Login failed: JWT secret is not configured');
      throw new SignupError('Login failed');
    }

    try {
      const user = await this.repository.findByEmail(email);
      if (!user) {
        throw new InvalidCredentialsError();
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new InvalidCredentialsError();
      }

      const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
      return { token, user };
    } catch (error) {
      console.error('Error during login:', error);
      throw new LoginError('Login failed');
    }
  };

  signup = async (userData: UserInput): Promise<{ token: string; user: User }> => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('Sign up failed: JWT secret is not configured');
      throw new SignupError('Signup failed');
    }

    try {
      const existingUser = await this.repository.findByEmail(userData.email);
      if (existingUser) {
        throw new UserExistsError(userData.email);
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.repository.create({
        ...userData,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
      return { token, user };
    } catch (error) {
      if (error instanceof UserExistsError) {
        throw error;
      }
      console.error('Error during signup:', error);
      throw new SignupError('Signup failed');
    }
  };

  logout = async (token: string): Promise<void> => {
    try {
      await redisClient.set(`${BLACKLIST_PREFIX}${token}`, '1', 'EX', 24 * 60 * 60);
    } catch (error: unknown) {
      console.error('Failed to blacklist token:', error);
      throw new LogoutError('Logout failed');
    }
  };

  isTokenBlacklisted = async (token: string): Promise<boolean> => {
    try {
      const exists = await redisClient.get(`${BLACKLIST_PREFIX}${token}`);
      return exists !== null;
    } catch (error) {
      console.error('Failed to check token blacklist:', error);
      throw new AuthError('Failed to verify token status');
    }
  };
}
