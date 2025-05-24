// You could generate this from Prisma or define it manually
export interface Book {
  bookId: string;
  title: string;
  author: string;
  genre: string;
  price: number;
}

export interface BookInput {
  title: string;
  author: string;
  genre: string;
  price: number;
}
