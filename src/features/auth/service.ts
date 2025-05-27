import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './repository/';
import { User, UserInput, UserLoginResult, UserSignupResult } from './model';
import { UserExistsError, InvalidCredentialsError, LoginError, SignupError, LogoutError, AuthError } from './errors';

const TOKEN_EXPIRATION = '24h';
const SALT_ROUNDS = 10;

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  private validatePassword(password: string): void {
    if (password.length < 6) {
      throw new SignupError('Password must be at least 6 characters long');
    }
  }

  private removePassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  login = async (email: string, password: string): Promise<{ token: string; user: UserLoginResult }> => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('Login failed: JWT secret is not configured');
      throw new LoginError('Login failed');
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
      return { token, user: this.removePassword(user) };
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  signup = async (userData: UserInput): Promise<{ token: string; user: UserSignupResult }> => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('Sign up failed: JWT secret is not configured');
      throw new SignupError('Signup failed');
    }

    try {
      this.validatePassword(userData.password);
      const existingUser = await this.repository.findByEmail(userData.email);
      if (existingUser) {
        throw new UserExistsError(userData.email);
      }

      const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
      const user = await this.repository.create({
        ...userData,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
      return { token, user: this.removePassword(user) };
    } catch (error) {
      if (error instanceof UserExistsError) {
        throw error;
      }
      console.error('Error during signup:', error);
      throw new SignupError('Signup failed');
    }
  };

  logout = async (): Promise<void> => {
    // For a take-home, we can just let the token expire
    return;
  };
}
