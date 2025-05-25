import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.book.deleteMany();

  // Seed books
  const books = [
    { bookId: '1', title: 'To Kill a Mockingbird', author: 'Homer', genre: 'Mystery', price: 6.59 },
    { bookId: '2', title: 'Moby Dick', author: 'Fyodor Dostoevsky', genre: 'Non-Fiction', price: 18.01 },
    { bookId: '3', title: 'The Great Gatsby', author: 'Harper Lee', genre: 'Non-Fiction', price: 11.05 },
    { bookId: '4', title: 'Moby Dick', author: 'Homer', genre: 'Adventure', price: 21.91 },
    { bookId: '5', title: 'The Odyssey', author: 'James Joyce', genre: 'Biography', price: 29.21 },
    { bookId: '6', title: 'To Kill a Mockingbird', author: 'Leo Tolstoy', genre: 'Historical', price: 11.9 },
    { bookId: '7', title: '1984', author: 'Harper Lee', genre: 'Sci-Fi', price: 11.26 },
    { bookId: '8', title: '1984', author: 'Leo Tolstoy', genre: 'Mystery', price: 21.43 },
    { bookId: '9', title: 'Pride and Prejudice', author: 'Aldous Huxley', genre: 'Adventure', price: 28.78 },
    { bookId: '10', title: '1984', author: 'Herman Melville', genre: 'Biography', price: 22.49 },
    { bookId: '11', title: 'War and Peace', author: 'Homer', genre: 'Horror', price: 29.83 },
    { bookId: '12', title: 'The Great Gatsby', author: 'James Joyce', genre: 'Fantasy', price: 29.58 },
    { bookId: '13', title: 'The Great Gatsby', author: 'Homer', genre: 'Fiction', price: 6.69 },
    { bookId: '14', title: 'The Odyssey', author: 'Jane Austen', genre: 'Adventure', price: 16.92 },
    { bookId: '15', title: '1984', author: 'Aldous Huxley', genre: 'Historical', price: 8.22 },
    { bookId: '16', title: 'Crime and Punishment', author: 'F. Scott Fitzgerald', genre: 'Historical', price: 15.08 },
    { bookId: '17', title: 'Brave New World', author: 'Fyodor Dostoevsky', genre: 'Fantasy', price: 28.17 },
    { bookId: '18', title: 'Ulysses', author: 'Harper Lee', genre: 'Fantasy', price: 18.5 },
    { bookId: '19', title: '1984', author: 'Homer', genre: 'Fiction', price: 22.2 },
    { bookId: '20', title: 'Ulysses', author: 'F. Scott Fitzgerald', genre: 'Biography', price: 28.92 },
    { bookId: '21', title: 'The Great Gatsby', author: 'George Orwell', genre: 'Adventure', price: 27.93 },
    { bookId: '22', title: 'Moby Dick', author: 'Fyodor Dostoevsky', genre: 'Biography', price: 9.1 },
    { bookId: '23', title: 'Pride and Prejudice', author: 'Homer', genre: 'Biography', price: 10.25 },
    { bookId: '24', title: 'Moby Dick', author: 'F. Scott Fitzgerald', genre: 'Romance', price: 12.48 },
    { bookId: '25', title: 'Brave New World', author: 'Leo Tolstoy', genre: 'Horror', price: 9.0 },
    { bookId: '26', title: 'The Odyssey', author: 'George Orwell', genre: 'Biography', price: 18.03 },
    { bookId: '27', title: 'Pride and Prejudice', author: 'Fyodor Dostoevsky', genre: 'Fantasy', price: 20.64 },
    { bookId: '28', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Sci-Fi', price: 28.51 },
    { bookId: '29', title: 'To Kill a Mockingbird', author: 'Herman Melville', genre: 'Romance', price: 27.65 },
    { bookId: '30', title: 'War and Peace', author: 'F. Scott Fitzgerald', genre: 'Fiction', price: 11.51 },
    { bookId: '31', title: '1984', author: 'Leo Tolstoy', genre: 'Horror', price: 18.63 },
    { bookId: '32', title: 'Pride and Prejudice', author: 'Fyodor Dostoevsky', genre: 'Non-Fiction', price: 14.18 },
    { bookId: '33', title: 'Moby Dick', author: 'Aldous Huxley', genre: 'Biography', price: 29.61 },
    { bookId: '34', title: 'To Kill a Mockingbird', author: 'George Orwell', genre: 'Sci-Fi', price: 20.98 },
    { bookId: '35', title: 'Pride and Prejudice', author: 'F. Scott Fitzgerald', genre: 'Adventure', price: 27.96 },
    { bookId: '36', title: 'Moby Dick', author: 'Homer', genre: 'Fiction', price: 23.26 },
    { bookId: '37', title: 'Ulysses', author: 'Herman Melville', genre: 'Romance', price: 20.94 },
    { bookId: '38', title: 'To Kill a Mockingbird', author: 'Fyodor Dostoevsky', genre: 'Horror', price: 29.95 },
    { bookId: '39', title: 'Brave New World', author: 'Fyodor Dostoevsky', genre: 'Fiction', price: 17.03 },
    { bookId: '40', title: 'Ulysses', author: 'James Joyce', genre: 'Biography', price: 7.59 },
    { bookId: '41', title: '1984', author: 'George Orwell', genre: 'Fiction', price: 7.07 },
    { bookId: '42', title: 'Pride and Prejudice', author: 'Herman Melville', genre: 'Fantasy', price: 26.92 },
    { bookId: '43', title: 'Moby Dick', author: 'James Joyce', genre: 'Adventure', price: 23.09 },
    { bookId: '44', title: 'To Kill a Mockingbird', author: 'F. Scott Fitzgerald', genre: 'Sci-Fi', price: 15.62 },
    { bookId: '45', title: 'The Odyssey', author: 'Herman Melville', genre: 'Sci-Fi', price: 15.71 },
    { bookId: '46', title: 'Brave New World', author: 'Leo Tolstoy', genre: 'Horror', price: 28.94 },
    { bookId: '47', title: 'Brave New World', author: 'Harper Lee', genre: 'Sci-Fi', price: 10.64 },
    { bookId: '48', title: 'Crime and Punishment', author: 'James Joyce', genre: 'Horror', price: 9.14 },
    { bookId: '49', title: 'The Odyssey', author: 'Leo Tolstoy', genre: 'Horror', price: 28.36 },
    { bookId: '50', title: 'The Odyssey', author: 'Jane Austen', genre: 'Fiction', price: 28.1 },
    { bookId: '51', title: 'The Odyssey', author: 'Harper Lee', genre: 'Adventure', price: 28.4 },
    { bookId: '52', title: 'Crime and Punishment', author: 'Homer', genre: 'Sci-Fi', price: 29.78 },
    { bookId: '53', title: 'Brave New World', author: 'Jane Austen', genre: 'Biography', price: 9.76 },
    { bookId: '54', title: 'To Kill a Mockingbird', author: 'George Orwell', genre: 'Fiction', price: 21.89 },
    { bookId: '55', title: 'To Kill a Mockingbird', author: 'Fyodor Dostoevsky', genre: 'Adventure', price: 21.86 },
    { bookId: '56', title: 'Brave New World', author: 'Aldous Huxley', genre: 'Horror', price: 21.44 },
    { bookId: '57', title: 'Brave New World', author: 'F. Scott Fitzgerald', genre: 'Biography', price: 6.87 },
    { bookId: '58', title: '1984', author: 'Jane Austen', genre: 'Historical', price: 26.96 },
    { bookId: '59', title: '1984', author: 'Leo Tolstoy', genre: 'Non-Fiction', price: 25.04 },
    { bookId: '60', title: 'Ulysses', author: 'Leo Tolstoy', genre: 'Horror', price: 20.85 },
    { bookId: '61', title: '1984', author: 'George Orwell', genre: 'Mystery', price: 17.65 },
    { bookId: '62', title: 'The Odyssey', author: 'James Joyce', genre: 'Mystery', price: 5.56 },
    { bookId: '63', title: 'Brave New World', author: 'Aldous Huxley', genre: 'Sci-Fi', price: 14.88 },
    { bookId: '64', title: 'War and Peace', author: 'F. Scott Fitzgerald', genre: 'Biography', price: 7.93 },
    { bookId: '65', title: 'War and Peace', author: 'Fyodor Dostoevsky', genre: 'Mystery', price: 24.08 },
    { bookId: '66', title: 'Pride and Prejudice', author: 'F. Scott Fitzgerald', genre: 'Mystery', price: 10.0 },
    { bookId: '67', title: 'War and Peace', author: 'James Joyce', genre: 'Sci-Fi', price: 27.24 },
    { bookId: '68', title: 'The Great Gatsby', author: 'Jane Austen', genre: 'Mystery', price: 25.86 },
    { bookId: '69', title: 'Crime and Punishment', author: 'James Joyce', genre: 'Sci-Fi', price: 5.17 },
    { bookId: '70', title: 'Ulysses', author: 'Aldous Huxley', genre: 'Non-Fiction', price: 6.8 },
    { bookId: '71', title: 'Pride and Prejudice', author: 'James Joyce', genre: 'Adventure', price: 24.81 },
    { bookId: '72', title: 'The Great Gatsby', author: 'Jane Austen', genre: 'Historical', price: 23.14 },
    { bookId: '73', title: 'The Great Gatsby', author: 'Harper Lee', genre: 'Adventure', price: 9.8 },
    { bookId: '74', title: 'Crime and Punishment', author: 'Jane Austen', genre: 'Historical', price: 8.61 },
    { bookId: '75', title: 'The Odyssey', author: 'Aldous Huxley', genre: 'Biography', price: 18.91 },
    { bookId: '76', title: 'War and Peace', author: 'Fyodor Dostoevsky', genre: 'Mystery', price: 25.35 },
    { bookId: '77', title: 'The Odyssey', author: 'James Joyce', genre: 'Romance', price: 25.78 },
    { bookId: '78', title: '1984', author: 'George Orwell', genre: 'Fantasy', price: 12.01 },
    { bookId: '79', title: 'War and Peace', author: 'Homer', genre: 'Adventure', price: 18.04 },
    { bookId: '80', title: 'Pride and Prejudice', author: 'Herman Melville', genre: 'Mystery', price: 9.1 },
    { bookId: '81', title: 'Ulysses', author: 'F. Scott Fitzgerald', genre: 'Fiction', price: 20.31 },
    { bookId: '82', title: 'Crime and Punishment', author: 'Aldous Huxley', genre: 'Fiction', price: 21.4 },
    { bookId: '83', title: 'Moby Dick', author: 'Harper Lee', genre: 'Horror', price: 15.55 },
    { bookId: '84', title: 'Ulysses', author: 'F. Scott Fitzgerald', genre: 'Mystery', price: 27.76 },
    { bookId: '85', title: 'Pride and Prejudice', author: 'George Orwell', genre: 'Romance', price: 6.36 },
    { bookId: '86', title: '1984', author: 'Fyodor Dostoevsky', genre: 'Horror', price: 13.68 },
    { bookId: '87', title: 'Pride and Prejudice', author: 'Leo Tolstoy', genre: 'Historical', price: 6.55 },
    { bookId: '88', title: 'The Odyssey', author: 'James Joyce', genre: 'Sci-Fi', price: 8.05 },
    { bookId: '89', title: 'Ulysses', author: 'Aldous Huxley', genre: 'Fantasy', price: 12.12 },
    { bookId: '90', title: 'Crime and Punishment', author: 'Aldous Huxley', genre: 'Adventure', price: 18.46 },
    { bookId: '91', title: 'Brave New World', author: 'George Orwell', genre: 'Non-Fiction', price: 24.96 },
    { bookId: '92', title: 'Pride and Prejudice', author: 'Harper Lee', genre: 'Sci-Fi', price: 28.23 },
    { bookId: '93', title: 'Moby Dick', author: 'F. Scott Fitzgerald', genre: 'Adventure', price: 28.54 },
    { bookId: '94', title: 'War and Peace', author: 'F. Scott Fitzgerald', genre: 'Horror', price: 15.37 },
    { bookId: '95', title: 'Brave New World', author: 'James Joyce', genre: 'Horror', price: 17.82 },
    { bookId: '96', title: 'Ulysses', author: 'George Orwell', genre: 'Fiction', price: 26.25 },
    { bookId: '97', title: 'War and Peace', author: 'F. Scott Fitzgerald', genre: 'Fiction', price: 12.75 },
    { bookId: '98', title: 'Pride and Prejudice', author: 'Leo Tolstoy', genre: 'Historical', price: 7.61 },
    { bookId: '99', title: 'Moby Dick', author: 'Homer', genre: 'Romance', price: 20.26 },
    { bookId: '100', title: 'The Odyssey', author: 'Jane Austen', genre: 'Biography', price: 19.01 },
  ];

  for (const book of books) {
    await prisma.book.create({
      data: book,
    });
  }

  console.log(`Database has been seeded with ${books.length} books. 🌱`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
