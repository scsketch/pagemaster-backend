// You could generate this from Prisma or define it manually
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string; // This is the genre name
  price: number;
}

export interface BookDetail extends Book {
  description: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  genre: string; // This is the genre name
  price: number;
  description?: string;
}

export type UpdateBookInput = CreateBookInput;

// Internal types for Prisma operations
export interface PrismaBookCreateInput {
  title: string;
  author: string;
  genreId: string;
  price: number;
  description?: string;
}

export interface PrismaBookUpdateInput {
  title?: string;
  author?: string;
  genreId?: string;
  price?: number;
  description?: string;
}
