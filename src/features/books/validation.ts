import { body, query } from 'express-validator';
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

export const bookUpdateValidation: RequestHandler[] = [...bookValidation];

export const paginationValidation: RequestHandler[] = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive number'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('search').optional().isString().trim().withMessage('Search must be a string'),
  query('genre').optional().isString().trim().withMessage('Genre must be a string'),
  validateRequest as RequestHandler,
];
