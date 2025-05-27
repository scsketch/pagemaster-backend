import { BookTestFactory } from './books.factory';
import { BookNotFoundError, BookError } from '../errors';

describe('BookService', () => {
  let bookFactory: BookTestFactory;

  const testBooks = [
    {
      title: 'The Book of Atrus',
      author: 'Rand Miller and Robyn Miller',
      genre: 'Fantasy',
      price: 14.99,
      description:
        'The first novel in the Myst series, telling the story of Atrus and his relationship with his father Gehn',
    },
    {
      title: "The Book of Ti'ana",
      author: 'Rand Miller and David Wingrove',
      genre: 'Fantasy',
      price: 14.99,
      description: "The second novel in the Myst series, chronicling the fall of the D'ni civilization",
    },
    {
      title: "The Book of D'ni",
      author: 'Rand Miller and David Wingrove',
      genre: 'Fantasy',
      price: 14.99,
      description:
        "The third novel in the Myst series, following Atrus as he attempts to restore the D'ni civilization",
    },
  ];

  beforeEach(() => {
    bookFactory = new BookTestFactory();
  });

  afterEach(async () => {
    await bookFactory.clearDatabase();
  });

  describe('getBooks', () => {
    beforeEach(async () => {
      const service = bookFactory.getService();
      for (const book of testBooks) {
        await service.createBook(book);
      }
    });

    it('should return all books with default pagination', async () => {
      // Arrange
      const service = bookFactory.getService();

      // Act
      const result = await service.getBooks();

      // Assert
      expect(result.data).toHaveLength(3);
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(1);
    });

    it('should filter books by search term', async () => {
      // Arrange
      const service = bookFactory.getService();

      // Act
      const result = await service.getBooks({ search: 'David Wingrove' });

      // Assert
      expect(result.data).toHaveLength(2);
      expect(result.data.every((book) => book.author === 'Rand Miller and David Wingrove')).toBe(true);
    });

    it('should filter books by genre', async () => {
      // Arrange
      const service = bookFactory.getService();

      // Act
      const result = await service.getBooks({ genre: 'Fantasy' });

      // Assert
      expect(result.data).toHaveLength(3);
      expect(result.data.every((book) => book.genre === 'Fantasy')).toBe(true);
    });

    it('should handle pagination correctly', async () => {
      // Arrange
      const service = bookFactory.getService();

      // Act
      const result = await service.getBooks({ page: 1, limit: 2 });

      // Assert
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(2);
      expect(result.totalPages).toBe(2);
    });
  });

  describe('getBookById', () => {
    it('should return a book by id', async () => {
      // Arrange
      const service = bookFactory.getService();
      const book = await service.createBook(testBooks[0]);

      // Act
      const result = await service.getBookById(book.id);

      // Assert
      expect(result).toEqual(book);
    });

    it('should throw BookNotFoundError for non-existent id', async () => {
      // Arrange
      const service = bookFactory.getService();

      // Act
      const getBookPromise = service.getBookById('non-existent-id');

      // Assert
      await expect(getBookPromise).rejects.toThrow(BookNotFoundError);
    });
  });

  describe('createBook', () => {
    it('should create a new book successfully', async () => {
      // Arrange
      const service = bookFactory.getService();

      // Act
      const result = await service.createBook(testBooks[0]);

      // Assert
      expect(result).toMatchObject(testBooks[0]);
      expect(result).toHaveProperty('id');
    });
  });

  describe('updateBook', () => {
    it('should update a book successfully', async () => {
      // Arrange
      const service = bookFactory.getService();
      const book = await service.createBook(testBooks[0]);

      const updateData = {
        price: 19.99,
        description: 'Updated description',
      };

      // Act
      const result = await service.updateBook(book.id, updateData);

      // Assert
      expect(result.price).toBe(updateData.price);
      expect(result.description).toBe(updateData.description);
      expect(result.title).toBe(book.title); // Unchanged fields should remain the same
    });

    it('should throw BookNotFoundError when updating non-existent book', async () => {
      // Arrange
      const service = bookFactory.getService();

      // Act
      const updatePromise = service.updateBook('non-existent-id', { price: 19.99 });

      // Assert
      await expect(updatePromise).rejects.toThrow(BookNotFoundError);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book successfully', async () => {
      // Arrange
      const service = bookFactory.getService();
      const book = await service.createBook(testBooks[0]);

      // Act
      await service.deleteBook(book.id);

      // Assert
      const getBookPromise = service.getBookById(book.id);
      await expect(getBookPromise).rejects.toThrow(BookNotFoundError);
    });
  });
});
