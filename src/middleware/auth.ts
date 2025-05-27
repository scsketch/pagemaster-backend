import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../features/auth';

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

export const createAuthMiddleware = () => {
  const JWT_SECRET = process.env.JWT_SECRET;

  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      console.error('Authentication failed: No token provided');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!JWT_SECRET) {
      console.error('Authentication failed: JWT secret is not configured');
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error('Authentication failed: Token expired');
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        console.error('Authentication failed: Invalid token:', error);
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // For any other unexpected errors
      console.error('Authentication failed:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};
