-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_passenger_code_fkey";

-- AlterTable
ALTER TABLE "passenger" ALTER COLUMN "code" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "passenger_code" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_passenger_code_fkey" FOREIGN KEY ("passenger_code") REFERENCES "passenger"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
