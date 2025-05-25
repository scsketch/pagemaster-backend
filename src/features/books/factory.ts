import { BookController } from './controller';
import { BookService } from './service';
import { PrismaBookRepository, BookRepository } from './repository/';

export class BookFactory {
  private static repository: BookRepository;
  private static service: BookService;
  private static controller: BookController;

  static getRepository(): BookRepository {
    if (!this.repository) {
      this.repository = new PrismaBookRepository();
    }
    return this.repository;
  }

  static getService(): BookService {
    if (!this.service) {
      this.service = new BookService(this.getRepository());
    }
    return this.service;
  }

  static getController(): BookController {
    if (!this.controller) {
      this.controller = new BookController(this.getService());
    }
    return this.controller;
  }
}
