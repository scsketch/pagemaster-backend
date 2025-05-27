import { Book, BookDetail, CreateBookInput, UpdateBookInput } from '../model';
import { BookRepository, PaginationParams, PaginatedResult } from '../repository/repository';
import { BookService } from '../service';
import { v4 as uuidv4 } from 'uuid';
import { MockBookRepository } from './mock.repository';

export class BookTestFactory {
  private repository: BookRepository;

  constructor() {
    this.repository = new MockBookRepository();
  }

  getRepository(): BookRepository {
    return this.repository;
  }

  getService(): BookService {
    return new BookService(this.repository);
  }

  async clearDatabase(): Promise<void> {
    await (this.repository as MockBookRepository).clear();
  }
}
