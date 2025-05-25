import { Request, Response } from 'express';
import * as service from './service';
import { AuthInput, SignUpInput } from './model';
import { UserExistsError } from './errors';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: AuthInput = req.body;

  try {
    const result = await service.login(email, password);
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
    const result = await service.signup(email, password);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof UserExistsError) {
      console.error(`Signup failed: User already exists with email ${email}`);
      res.status(400).json({ message: 'The email has already been registered.' });
      return;
    }
    console.error(`Signup failed for email ${email}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  try {
    if (token) {
      await service.logout(token);
    }
    res.status(204).send();
  } catch (error) {
    console.error('Logout failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
