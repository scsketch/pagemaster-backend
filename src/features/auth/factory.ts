import { AuthController } from './controller';
import { AuthService } from './service';
import { PrismaAuthRepository, AuthRepository } from './repository/';

export class AuthFactory {
  private repository: AuthRepository;
  private service: AuthService;
  private controller: AuthController;

  constructor() {
    this.repository = new PrismaAuthRepository();
    this.service = new AuthService(this.repository);
    this.controller = new AuthController(this.service);
  }

  getRepository(): AuthRepository {
    return this.repository;
  }

  getService(): AuthService {
    return this.service;
  }

  getController(): AuthController {
    return this.controller;
  }
}
