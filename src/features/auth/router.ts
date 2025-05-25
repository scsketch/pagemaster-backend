import { Router } from 'express';
import { AuthController } from './controller';

export const createRouter = (controller: AuthController): Router => {
  const router = Router();

  router.post('/login', controller.login);
  router.post('/signup', controller.signup);
  router.post('/logout', controller.logout);

  return router;
};
