import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err.status || 500;

  // Log the detailed error for debugging
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    status: statusCode,
  });

  // Send a generic error response
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Internal server error' : 'An error occurred',
  });
}
