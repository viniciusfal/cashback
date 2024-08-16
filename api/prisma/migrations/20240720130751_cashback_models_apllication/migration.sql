-- CreateTable
CREATE TABLE "passenger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "cashBack" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "passenger_id" TEXT NOT NULL,
    "ticketPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passenger_code_key" ON "passenger"("code");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
