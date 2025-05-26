import { body } from 'express-validator';
import { RequestHandler } from 'express';
import { validateRequest } from '../../middleware/validation';

export const bookValidation: RequestHandler[] = [
  body('title').trim().isLength({ min: 1, max: 255 }).withMessage('Invalid title'),
  body('author').trim().isLength({ min: 1, max: 255 }).withMessage('Invalid author'),
  body('genre').trim().isLength({ min: 1, max: 100 }).withMessage('Invalid genre'),
  body('price').isFloat({ min: 0 }).withMessage('Invalid price'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Invalid description'),
  validateRequest as RequestHandler,
];
