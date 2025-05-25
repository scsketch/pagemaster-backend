import { Book, CreateBookInput, UpdateBookInput } from '../model';

export interface BookRepository {
  findAll(): Promise<Book[]>;
  findById(id: string): Promise<Book | null>;
  create(data: CreateBookInput): Promise<Book>;
  update(id: string, data: UpdateBookInput): Promise<Book>;
  remove(id: string): Promise<void>;
}
