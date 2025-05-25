import { Router, RequestHandler } from 'express';
import { AuthController } from './controller';
import { body } from 'express-validator';
import { validateRequest } from '../../middleware/validation';

export const createRouter = (controller: AuthController): Router => {
  const router = Router();

  // Login validation
  const loginValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').isString().trim(),
    validateRequest,
  ] as RequestHandler[];

  // Signup validation
  const signupValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').isString().trim().isLength({ min: 6 }),
    validateRequest,
  ] as RequestHandler[];

  router.post('/login', loginValidation, controller.login);
  router.post('/signup', signupValidation, controller.signup);
  router.post('/logout', controller.logout);

  return router;
};
