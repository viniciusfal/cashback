/*
  Warnings:

  - You are about to drop the column `passenger_id` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `passenger_code` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_passenger_id_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "passenger_id",
ADD COLUMN     "passenger_code" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_passenger_code_fkey" FOREIGN KEY ("passenger_code") REFERENCES "passenger"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
