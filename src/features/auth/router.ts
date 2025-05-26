import { Router } from 'express';
import { AuthController } from './controller';
import { loginValidation, signupValidation } from './validation';

export const createRouter = (controller: AuthController): Router => {
  const router = Router();

  router.post('/login', loginValidation, controller.login);
  router.post('/signup', signupValidation, controller.signup);
  router.post('/logout', controller.logout);

  return router;
};
