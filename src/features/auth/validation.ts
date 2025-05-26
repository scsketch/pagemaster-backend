import { body } from 'express-validator';
import { RequestHandler } from 'express';
import { validateRequest } from '../../middleware/validation';

export const loginValidation: RequestHandler[] = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').isString().trim().withMessage('Invalid password'),
  validateRequest as RequestHandler,
];

export const signupValidation: RequestHandler[] = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').isString().trim().isLength({ min: 6 }).withMessage('Invalid password'),
  validateRequest as RequestHandler,
];
