// Service
export class BookError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BookError';
  }
}

export class BookNotFoundError extends BookError {
  constructor(id: string) {
    super(`Could not find book with id: ${id}`);
    this.name = 'BookNotFoundError';
  }
}

// Repository
export class RepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}
