import { PrismaTransactionRepository } from 'src/transaction/repositories/prisma-repository/prisma-transaction-repository'
import { RegisterTransaction } from '../register-transaction'
import { PrismaPassengerRepository } from 'src/passenger/repositories/prisma-repository/prisma-passenger-repository'

export function makeRegisterTransaction() {
  const transactionsRepository = new PrismaTransactionRepository()
  const passengersRepository = new PrismaPassengerRepository()
  const registerTransactionUseCase = new RegisterTransaction(
    transactionsRepository,
    passengersRepository,
  )

  return registerTransactionUseCase
}
