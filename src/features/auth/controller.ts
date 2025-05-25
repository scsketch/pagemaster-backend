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

      console.log('Successfully logged in user: ', result.user.userId);
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
      const { email, password }: SignUpInput = req.body;

      const { user, token } = await this.service.signup({ email, password });
      const { password: _, ...userWithoutPassword } = user;

      console.log('Successfully signed up user: ', user.userId);
      res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
      if (error instanceof UserExistsError) {
        console.error('Error during signup, user already exists');
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
        console.log('No token provided for logout - returning success');
        res.status(200).json({ message: 'Successfully logged out' });
        return;
      }

      const token = authHeader.split(' ')[1];
      try {
        await this.service.logout(token);
        console.log('Successfully blacklisted token');
      } catch (error) {
        // If blacklisting fails, we still want to return success
        console.error('Failed to blacklist token:', error);
      }

      console.log('Successfully logged out user');
      res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      res.status(200).json({ message: 'Successfully logged out' });
    }
  };
}
