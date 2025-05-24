import { Request, Response } from 'express';
import * as authService from './service';
import { AuthInput, SignUpInput } from './model';

export const login = async (req: Request, res: Response) => {
  const { email, password }: AuthInput = req.body;

  try {
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword }: SignUpInput = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ message: 'Passwords do not match' });
    return;
  }

  try {
    const result = await authService.signup(email, password);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const logout = async (_req: Request, res: Response) => {
  // In a real application, you might want to invalidate the token
  // or clear any session data
  res.status(200).json({ message: 'Logged out successfully' });
};
