import { Book, BookInput } from '../model';

export interface BookRepository {
  findAll(): Promise<Book[]>;
  findById(id: string): Promise<Book | null>;
  create(data: BookInput): Promise<Book>;
  update(id: string, data: BookInput): Promise<Book>;
  remove(id: string): Promise<void>;
}
