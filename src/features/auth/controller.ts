import { Request, Response } from 'express';
import { AuthService } from './service';
import { LoginInput, SignUpInput, User } from './model';
import { UserExistsError, InvalidCredentialsError, AuthError } from './errors';

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const setAuthCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
  });
};

export class AuthController {
  constructor(private readonly service: AuthService) {}

  getService = () => this.service;

  login = async (req: Request, res: Response) => {
    try {
      const { email, password }: LoginInput = req.body;
      const result = await this.service.login(email, password);

      setAuthCookie(res, result.token);

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

      // Set the token cookie which will be used by web clients
      setAuthCookie(res, token);

      // Also include token in response which is for native clients
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
