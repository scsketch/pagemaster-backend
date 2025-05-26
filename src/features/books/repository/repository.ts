import { Book, BookDetail, CreateBookInput, UpdateBookInput } from '../model';

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BookRepository {
  findAll(params?: PaginationParams): Promise<PaginatedResult<Book>>;
  findById(id: string): Promise<BookDetail | null>;
  create(data: CreateBookInput): Promise<BookDetail>;
  update(id: string, data: UpdateBookInput): Promise<BookDetail>;
  remove(id: string): Promise<void>;
}
