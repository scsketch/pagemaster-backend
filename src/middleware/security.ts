import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

if (!process.env.ALLOWED_ORIGINS) {
  throw new Error('ALLOWED_ORIGINS environment variable is required');
}

// Rate limit configuration
const rateLimitOptions = {
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: 'Too many requests, please try again later.',
};

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGINS?.split(',') : true, // Allow all origins in development
  credentials: true, // Allow cookies/authentication headers to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Added OPTIONS for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow these headers
};

// Helmet configuration
const helmetOptions = {
  hsts: process.env.NODE_ENV === 'production', // Forces HTTPS in production
  contentSecurityPolicy: process.env.NODE_ENV === 'production', // Prevents XSS attacks in production
};

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent caching of auth-related data (tokens, login responses, etc.)
  if (req.path.includes('/auth/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
};

// Export all security middleware
export const securityMiddleware = [
  helmet(helmetOptions),
  cors(corsOptions),
  rateLimit(rateLimitOptions),
  securityHeaders,
];
