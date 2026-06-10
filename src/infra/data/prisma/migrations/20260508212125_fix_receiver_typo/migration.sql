/*
  Warnings:

  - You are about to drop the column `recieverId` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_recieverId_fkey";

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "recieverId",
ADD COLUMN     "receiverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
