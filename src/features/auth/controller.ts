import { Request, Response } from 'express';
import { AuthService } from './service';
import { LoginInput, SignUpInput, User } from './model';
import { UserExistsError, InvalidCredentialsError, AuthError } from './errors';

export class AuthController {
  constructor(private readonly service: AuthService) {}

  getService = () => this.service;

  login = async (req: Request, res: Response) => {
    try {
      const { email, password }: LoginInput = req.body;
      const result = await this.service.login(email, password);
      res.json(result);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        res.status(401).json({ error: error.message });
        return;
      }
      console.error('Unexpected error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  signup = async (req: Request, res: Response) => {
    try {
      const { email, password, confirmPassword }: SignUpInput = req.body;

      if (password !== confirmPassword) {
        res.status(400).json({ error: 'Passwords do not match' });
        return;
      }

      const { user, token } = await this.service.signup({ email, password });
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
      if (error instanceof UserExistsError) {
        res.status(400).json({ error: 'The email has already been registered.' });
        return;
      }
      console.error('Unexpected error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'No token provided' });
        return;
      }

      const token = authHeader.split(' ')[1];
      await this.service.logout(token);
      res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
