/*
  Warnings:

  - You are about to drop the column `genre` on the `books` table. All the data in the column will be lost.
  - Added the required column `genreId` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "books_genre_idx";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "genre",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "genreId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "genres" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE INDEX "books_genreId_idx" ON "books"("genreId");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
