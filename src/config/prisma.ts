import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient({
  omit: {
    book: {
      id: true,
    },
    user: {
      id: true,
    },
  },
});

export default prisma;
