/*
  Warnings:

  - You are about to drop the column `isOverdue` on the `Loan` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('ANALYSIS', 'ACCEPTED', 'ONGOING', 'OVERDUE');

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "isOverdue",
ADD COLUMN     "status" "LoanStatus" NOT NULL DEFAULT 'ANALYSIS';
