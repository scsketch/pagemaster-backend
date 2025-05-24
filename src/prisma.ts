import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient({
  omit: {
    book: {
      id: true,
    },
    user: {
      password: true,
    },
  },
});

export default prisma;
