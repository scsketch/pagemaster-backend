import { BookController } from './controller';
import { BookService } from './service';
import { PrismaBookRepository, BookRepository } from './repository/';

export class BookFactory {
  private repository: BookRepository;
  private service: BookService;
  private controller: BookController;

  constructor() {
    this.repository = new PrismaBookRepository();
    this.service = new BookService(this.repository);
    this.controller = new BookController(this.service);
  }

  getRepository(): BookRepository {
    return this.repository;
  }

  getService(): BookService {
    return this.service;
  }

  getController(): BookController {
    return this.controller;
  }
}
