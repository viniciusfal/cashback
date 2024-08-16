/*
  Warnings:

  - Added the required column `ticketTotal` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "ticketTotal" DOUBLE PRECISION NOT NULL;
