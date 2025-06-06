import { PrismaClient } from '../generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Book descriptions to avoid duplication
const bookDescriptions = {
  '1984':
    'A dystopian social science fiction novel set in a totalitarian society where critical thought is suppressed. The story follows Winston Smith, a low-ranking member of the ruling Party, as he begins to question the Party and its leader, Big Brother.',
  'Brave New World':
    "A dystopian novel set in a futuristic World State, where people are genetically bred and pharmaceutically anesthetized to passively serve a ruling order. The story follows Bernard Marx, who questions the society's values and practices.",
  'Crime and Punishment':
    'A psychological novel that follows the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student who plans to kill an unscrupulous pawnbroker for her money. The story explores themes of morality, redemption, and the nature of crime.',
  'Moby Dick':
    "An epic tale of the voyage of the whaling ship Pequod, commanded by Captain Ahab, who seeks revenge on the giant white sperm whale that bit off his leg. The novel explores themes of obsession, revenge, and man's relationship with nature.",
  'Pride and Prejudice':
    'A romantic novel that follows the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness. The story explores themes of love, marriage, and social class.',
  'The Great Gatsby':
    'A novel that follows a cast of characters living in the fictional towns of West Egg and East Egg on Long Island in the summer of 1922. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion for the beautiful Daisy Buchanan.',
  'The Odyssey':
    "An epic poem that follows the Greek hero Odysseus and his ten-year journey home after the fall of Troy. The story is filled with mythical creatures, divine interventions, and tests of Odysseus's wit and courage.",
  'To Kill a Mockingbird':
    "A novel that deals with serious issues like rape and racial inequality through the eyes of a child. The story follows Scout Finch, whose father, Atticus, defends a black man accused of a crime he didn't commit.",
  Ulysses:
    'A modernist novel that follows the experiences and thoughts of Leopold Bloom and Stephen Dedalus over the course of one day in Dublin. The novel is known for its stream of consciousness technique and complex structure.',
  'War and Peace':
    'A historical novel that follows five aristocratic families during the Napoleonic Wars. The story explores themes of war, peace, love, and the search for meaning in life, against the backdrop of historical events.',
};

async function main() {
  // Clear existing data
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();

  // Get unique genres from book data
  const bookData = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Homer',
      genre: 'Mystery',
      price: 6.59,
      description: bookDescriptions['To Kill a Mockingbird'],
    },
    {
      title: 'Moby Dick',
      author: 'Fyodor Dostoevsky',
      genre: 'Non-Fiction',
      price: 18.01,
      description: bookDescriptions['Moby Dick'],
    },
    {
      title: 'The Great Gatsby',
      author: 'Harper Lee',
      genre: 'Non-Fiction',
      price: 11.05,
      description: bookDescriptions['The Great Gatsby'],
    },
    {
      title: 'Moby Dick',
      author: 'Homer',
      genre: 'Adventure',
      price: 21.91,
      description: bookDescriptions['Moby Dick'],
    },
    {
      title: 'The Odyssey',
      author: 'James Joyce',
      genre: 'Biography',
      price: 29.21,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Leo Tolstoy',
      genre: 'Historical',
      price: 11.9,
      description: bookDescriptions['To Kill a Mockingbird'],
    },
    {
      title: '1984',
      author: 'Harper Lee',
      genre: 'Sci-Fi',
      price: 11.26,
      description: bookDescriptions['1984'],
    },
    {
      title: '1984',
      author: 'Leo Tolstoy',
      genre: 'Mystery',
      price: 21.43,
      description: bookDescriptions['1984'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Aldous Huxley',
      genre: 'Adventure',
      price: 28.78,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: '1984',
      author: 'Herman Melville',
      genre: 'Biography',
      price: 22.49,
      description: bookDescriptions['1984'],
    },
    {
      title: 'War and Peace',
      author: 'Homer',
      genre: 'Horror',
      price: 29.83,
      description: bookDescriptions['War and Peace'],
    },
    {
      title: 'The Great Gatsby',
      author: 'James Joyce',
      genre: 'Fantasy',
      price: 29.58,
      description: bookDescriptions['The Great Gatsby'],
    },
    {
      title: 'The Great Gatsby',
      author: 'Homer',
      genre: 'Fiction',
      price: 6.69,
      description: bookDescriptions['The Great Gatsby'],
    },
    {
      title: 'The Odyssey',
      author: 'Jane Austen',
      genre: 'Adventure',
      price: 16.92,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: '1984',
      author: 'Aldous Huxley',
      genre: 'Historical',
      price: 8.22,
      description: bookDescriptions['1984'],
    },
    {
      title: 'Crime and Punishment',
      author: 'F. Scott Fitzgerald',
      genre: 'Historical',
      price: 15.08,
      description: bookDescriptions['Crime and Punishment'],
    },
    {
      title: 'Brave New World',
      author: 'Fyodor Dostoevsky',
      genre: 'Fantasy',
      price: 28.17,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: 'Ulysses',
      author: 'Harper Lee',
      genre: 'Fantasy',
      price: 18.5,
      description: bookDescriptions['Ulysses'],
    },
    {
      title: '1984',
      author: 'Homer',
      genre: 'Fiction',
      price: 22.2,
      description: bookDescriptions['1984'],
    },
    {
      title: 'Ulysses',
      author: 'F. Scott Fitzgerald',
      genre: 'Biography',
      price: 28.92,
      description: bookDescriptions['Ulysses'],
    },
    {
      title: 'The Great Gatsby',
      author: 'George Orwell',
      genre: 'Adventure',
      price: 27.93,
      description: bookDescriptions['The Great Gatsby'],
    },
    {
      title: 'Moby Dick',
      author: 'Fyodor Dostoevsky',
      genre: 'Biography',
      price: 9.1,
      description: bookDescriptions['Moby Dick'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Homer',
      genre: 'Biography',
      price: 10.25,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'Moby Dick',
      author: 'F. Scott Fitzgerald',
      genre: 'Romance',
      price: 12.48,
      description: bookDescriptions['Moby Dick'],
    },
    {
      title: 'Brave New World',
      author: 'Leo Tolstoy',
      genre: 'Horror',
      price: 9.0,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: 'The Odyssey',
      author: 'George Orwell',
      genre: 'Biography',
      price: 18.03,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Fyodor Dostoevsky',
      genre: 'Fantasy',
      price: 20.64,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Sci-Fi',
      price: 28.51,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Herman Melville',
      genre: 'Romance',
      price: 27.65,
      description: bookDescriptions['To Kill a Mockingbird'],
    },
    {
      title: 'War and Peace',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      price: 11.51,
      description: bookDescriptions['War and Peace'],
    },
    {
      title: '1984',
      author: 'Leo Tolstoy',
      genre: 'Horror',
      price: 18.63,
      description: bookDescriptions['1984'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Fyodor Dostoevsky',
      genre: 'Non-Fiction',
      price: 14.18,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'Moby Dick',
      author: 'Aldous Huxley',
      genre: 'Biography',
      price: 29.61,
      description: bookDescriptions['Moby Dick'],
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'George Orwell',
      genre: 'Sci-Fi',
      price: 20.98,
      description: bookDescriptions['To Kill a Mockingbird'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'F. Scott Fitzgerald',
      genre: 'Adventure',
      price: 27.96,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'Moby Dick',
      author: 'Homer',
      genre: 'Fiction',
      price: 23.26,
      description: bookDescriptions['Moby Dick'],
    },
    {
      title: 'Ulysses',
      author: 'Herman Melville',
      genre: 'Romance',
      price: 20.94,
      description: bookDescriptions['Ulysses'],
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Fyodor Dostoevsky',
      genre: 'Horror',
      price: 29.95,
      description: bookDescriptions['To Kill a Mockingbird'],
    },
    {
      title: 'Brave New World',
      author: 'Fyodor Dostoevsky',
      genre: 'Fiction',
      price: 17.03,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: 'Ulysses',
      author: 'James Joyce',
      genre: 'Biography',
      price: 7.59,
      description: bookDescriptions['Ulysses'],
    },
    {
      title: '1984',
      author: 'George Orwell',
      genre: 'Fiction',
      price: 7.07,
      description: bookDescriptions['1984'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Herman Melville',
      genre: 'Fantasy',
      price: 26.92,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'Moby Dick',
      author: 'James Joyce',
      genre: 'Adventure',
      price: 23.09,
      description: bookDescriptions['Moby Dick'],
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'F. Scott Fitzgerald',
      genre: 'Sci-Fi',
      price: 15.62,
      description: bookDescriptions['To Kill a Mockingbird'],
    },
    {
      title: 'The Odyssey',
      author: 'Herman Melville',
      genre: 'Sci-Fi',
      price: 15.71,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: 'Brave New World',
      author: 'Leo Tolstoy',
      genre: 'Horror',
      price: 28.94,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: 'Brave New World',
      author: 'Harper Lee',
      genre: 'Sci-Fi',
      price: 10.64,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: 'Crime and Punishment',
      author: 'James Joyce',
      genre: 'Horror',
      price: 9.14,
      description: bookDescriptions['Crime and Punishment'],
    },
    {
      title: 'The Odyssey',
      author: 'Leo Tolstoy',
      genre: 'Horror',
      price: 28.36,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: 'The Odyssey',
      author: 'Jane Austen',
      genre: 'Fiction',
      price: 28.1,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: 'The Odyssey',
      author: 'Harper Lee',
      genre: 'Adventure',
      price: 28.4,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: 'Crime and Punishment',
      author: 'Homer',
      genre: 'Sci-Fi',
      price: 29.78,
      description: bookDescriptions['Crime and Punishment'],
    },
    {
      title: 'Brave New World',
      author: 'Jane Austen',
      genre: 'Biography',
      price: 9.76,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'George Orwell',
      genre: 'Fiction',
      price: 21.89,
      description: bookDescriptions['To Kill a Mockingbird'],
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Fyodor Dostoevsky',
      genre: 'Adventure',
      price: 21.86,
      description: bookDescriptions['To Kill a Mockingbird'],
    },
    {
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Horror',
      price: 21.44,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: 'Brave New World',
      author: 'F. Scott Fitzgerald',
      genre: 'Biography',
      price: 6.87,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: '1984',
      author: 'Jane Austen',
      genre: 'Historical',
      price: 26.96,
      description: bookDescriptions['1984'],
    },
    {
      title: '1984',
      author: 'Leo Tolstoy',
      genre: 'Non-Fiction',
      price: 25.04,
      description: bookDescriptions['1984'],
    },
    {
      title: 'Ulysses',
      author: 'Leo Tolstoy',
      genre: 'Horror',
      price: 20.85,
      description: bookDescriptions['Ulysses'],
    },
    {
      title: '1984',
      author: 'George Orwell',
      genre: 'Mystery',
      price: 17.65,
      description: bookDescriptions['1984'],
    },
    {
      title: 'The Odyssey',
      author: 'James Joyce',
      genre: 'Mystery',
      price: 5.56,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Sci-Fi',
      price: 14.88,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: 'War and Peace',
      author: 'F. Scott Fitzgerald',
      genre: 'Biography',
      price: 7.93,
      description: bookDescriptions['War and Peace'],
    },
    {
      title: 'War and Peace',
      author: 'Fyodor Dostoevsky',
      genre: 'Mystery',
      price: 24.08,
      description: bookDescriptions['War and Peace'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'F. Scott Fitzgerald',
      genre: 'Mystery',
      price: 10.0,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'War and Peace',
      author: 'James Joyce',
      genre: 'Sci-Fi',
      price: 27.24,
      description: bookDescriptions['War and Peace'],
    },
    {
      title: 'The Great Gatsby',
      author: 'Jane Austen',
      genre: 'Mystery',
      price: 25.86,
      description: bookDescriptions['The Great Gatsby'],
    },
    {
      title: 'Crime and Punishment',
      author: 'James Joyce',
      genre: 'Sci-Fi',
      price: 5.17,
      description: bookDescriptions['Crime and Punishment'],
    },
    {
      title: 'Ulysses',
      author: 'Aldous Huxley',
      genre: 'Non-Fiction',
      price: 6.8,
      description: bookDescriptions['Ulysses'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'James Joyce',
      genre: 'Adventure',
      price: 24.81,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'The Great Gatsby',
      author: 'Jane Austen',
      genre: 'Historical',
      price: 23.14,
      description: bookDescriptions['The Great Gatsby'],
    },
    {
      title: 'The Great Gatsby',
      author: 'Harper Lee',
      genre: 'Adventure',
      price: 9.8,
      description: bookDescriptions['The Great Gatsby'],
    },
    {
      title: 'Crime and Punishment',
      author: 'Jane Austen',
      genre: 'Historical',
      price: 8.61,
      description: bookDescriptions['Crime and Punishment'],
    },
    {
      title: 'The Odyssey',
      author: 'Aldous Huxley',
      genre: 'Biography',
      price: 18.91,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: 'War and Peace',
      author: 'Fyodor Dostoevsky',
      genre: 'Mystery',
      price: 25.35,
      description: bookDescriptions['War and Peace'],
    },
    {
      title: 'The Odyssey',
      author: 'James Joyce',
      genre: 'Romance',
      price: 25.78,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: '1984',
      author: 'George Orwell',
      genre: 'Fantasy',
      price: 12.01,
      description: bookDescriptions['1984'],
    },
    {
      title: 'War and Peace',
      author: 'Homer',
      genre: 'Adventure',
      price: 18.04,
      description: bookDescriptions['War and Peace'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Herman Melville',
      genre: 'Mystery',
      price: 9.1,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'Ulysses',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      price: 20.31,
      description: bookDescriptions['Ulysses'],
    },
    {
      title: 'Crime and Punishment',
      author: 'Aldous Huxley',
      genre: 'Fiction',
      price: 21.4,
      description: bookDescriptions['Crime and Punishment'],
    },
    {
      title: 'Moby Dick',
      author: 'Harper Lee',
      genre: 'Horror',
      price: 15.55,
      description: bookDescriptions['Moby Dick'],
    },
    {
      title: 'Ulysses',
      author: 'F. Scott Fitzgerald',
      genre: 'Mystery',
      price: 27.76,
      description: bookDescriptions['Ulysses'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'George Orwell',
      genre: 'Romance',
      price: 6.36,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: '1984',
      author: 'Fyodor Dostoevsky',
      genre: 'Horror',
      price: 13.68,
      description: bookDescriptions['1984'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Leo Tolstoy',
      genre: 'Historical',
      price: 6.55,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'The Odyssey',
      author: 'James Joyce',
      genre: 'Sci-Fi',
      price: 8.05,
      description: bookDescriptions['The Odyssey'],
    },
    {
      title: 'Ulysses',
      author: 'Aldous Huxley',
      genre: 'Fantasy',
      price: 12.12,
      description: bookDescriptions['Ulysses'],
    },
    {
      title: 'Crime and Punishment',
      author: 'Aldous Huxley',
      genre: 'Adventure',
      price: 18.46,
      description: bookDescriptions['Crime and Punishment'],
    },
    {
      title: 'Brave New World',
      author: 'George Orwell',
      genre: 'Non-Fiction',
      price: 24.96,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Harper Lee',
      genre: 'Sci-Fi',
      price: 28.23,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'Moby Dick',
      author: 'F. Scott Fitzgerald',
      genre: 'Adventure',
      price: 28.54,
      description: bookDescriptions['Moby Dick'],
    },
    {
      title: 'War and Peace',
      author: 'F. Scott Fitzgerald',
      genre: 'Horror',
      price: 15.37,
      description: bookDescriptions['War and Peace'],
    },
    {
      title: 'Brave New World',
      author: 'James Joyce',
      genre: 'Horror',
      price: 17.82,
      description: bookDescriptions['Brave New World'],
    },
    {
      title: 'Ulysses',
      author: 'George Orwell',
      genre: 'Fiction',
      price: 26.25,
      description: bookDescriptions['Ulysses'],
    },
    {
      title: 'War and Peace',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      price: 12.75,
      description: bookDescriptions['War and Peace'],
    },
    {
      title: 'Pride and Prejudice',
      author: 'Leo Tolstoy',
      genre: 'Historical',
      price: 7.61,
      description: bookDescriptions['Pride and Prejudice'],
    },
    {
      title: 'Moby Dick',
      author: 'Homer',
      genre: 'Romance',
      price: 20.26,
      description: bookDescriptions['Moby Dick'],
    },
    {
      title: 'The Odyssey',
      author: 'Jane Austen',
      genre: 'Biography',
      price: 19.01,
      description: bookDescriptions['The Odyssey'],
    },
  ];

  // Extract unique genres
  const uniqueGenres = [...new Set(bookData.map((book) => book.genre))];

  // Create genres first
  const genres = await Promise.all(
    uniqueGenres.map((genreName) =>
      prisma.genre.create({
        data: {
          name: genreName,
        },
      }),
    ),
  );

  // Create a map of genre names to their IDs
  const genreMap = genres.reduce((map, genre) => {
    map[genre.name] = genre.id;
    return map;
  }, {} as Record<string, string>);

  // Create books with proper genre relationships
  await Promise.all(
    bookData.map((book) =>
      prisma.book.create({
        data: {
          title: book.title,
          author: book.author,
          genreId: genreMap[book.genre],
          price: book.price,
          description: book.description,
        },
      }),
    ),
  );

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
