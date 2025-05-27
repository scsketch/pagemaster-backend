import { RequestHandler, Router } from 'express';
import { AuthController } from './controller';
import { loginValidation, signupValidation } from './validation';

export const createRouter = (controller: AuthController, authMiddleware: RequestHandler): Router => {
  const router = Router();

  router.post('/login', loginValidation, controller.login);
  router.post('/signup', signupValidation, controller.signup);
  router.post('/logout', authMiddleware, controller.logout);

  return router;
};
