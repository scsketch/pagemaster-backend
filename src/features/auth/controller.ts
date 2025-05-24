import { Request, Response } from 'express';
import * as authService from './service';
import { AuthInput, SignUpInput } from './model';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: AuthInput = req.body;

  try {
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error(`Login failed for email ${email}:`, error);
    // Generic message for all login failures
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, confirmPassword }: SignUpInput = req.body;

  if (password !== confirmPassword) {
    console.error(`Signup failed: Passwords do not match for email ${email}`);
    res.status(400).json({ message: 'Bad request' });
    return;
  }

  try {
    const result = await authService.signup(email, password);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      console.error(`Signup failed: User already exists with email ${email}`);
      // Generic message for all signup failures
      res.status(400).json({ message: 'Bad request' });
      return;
    }
    console.error(`Signup failed for email ${email}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    console.error('Logout failed: No token provided');
    res.status(500).json({ message: 'Internal server error' });
    return;
  }

  try {
    await authService.logout(token);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
