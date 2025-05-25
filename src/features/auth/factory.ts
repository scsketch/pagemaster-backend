import { AuthController } from './controller';
import { AuthService } from './service';
import { PrismaAuthRepository, AuthRepository } from './repository/';

export class AuthFactory {
  private static repository: AuthRepository;
  private static service: AuthService;
  private static controller: AuthController;

  static getRepository(): AuthRepository {
    if (!this.repository) {
      this.repository = new PrismaAuthRepository();
    }
    return this.repository;
  }

  static getService(): AuthService {
    if (!this.service) {
      this.service = new AuthService(this.getRepository());
    }
    return this.service;
  }

  static getController(): AuthController {
    if (!this.controller) {
      this.controller = new AuthController(this.getService());
    }
    return this.controller;
  }
}
