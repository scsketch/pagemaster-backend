import { Request, Response, NextFunction } from 'express';

export function notFoundHandler(req: Request, res: Response, _next: NextFunction) {
  // Log the not found request for debugging
  console.error('Route not found:', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  // Send a generic not found response
  res.status(404).json({
    message: 'Not found',
  });
}
