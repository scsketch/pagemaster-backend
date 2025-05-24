import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as authService from '../features/auth/service';

const JWT_SECRET = process.env.JWT_SECRET;

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    console.error('Authentication failed: No token provided');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!JWT_SECRET) {
    console.error('Authentication failed: JWT secret is not configured');
    return res.status(500).json({ message: 'Internal server error' });
  }

  try {
    // Check if token is blacklisted
    const isBlacklisted = await authService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      console.error('Authentication failed: Token is blacklisted');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
