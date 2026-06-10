/*
  Warnings:

  - Added the required column `maxPlayers` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minAge` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minPlayers` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GameCategories" AS ENUM ('TABLETOP', 'CARD', 'BOARD', 'PUZZLE', 'CARTRIDGES', 'DISC');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "maxPlayers" INTEGER NOT NULL,
ADD COLUMN     "minAge" INTEGER NOT NULL,
ADD COLUMN     "minPlayers" INTEGER NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "GameCategories" NOT NULL,
ALTER COLUMN "imagePath" DROP NOT NULL;
