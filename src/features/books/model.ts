// You could generate this from Prisma or define it manually
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
}

export interface BookDetail extends Book {
  description: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  genre: string;
  price: number;
  description?: string;
}

export type UpdateBookInput = CreateBookInput;
