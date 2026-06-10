/*
  Warnings:

  - You are about to drop the column `available` on the `Game` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "available",
ADD COLUMN     "imagePath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSuspended" BOOLEAN NOT NULL DEFAULT false;
