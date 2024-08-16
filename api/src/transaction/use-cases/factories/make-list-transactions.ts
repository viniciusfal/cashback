import { PrismaTransactionRepository } from 'src/transaction/repositories/prisma-repository/prisma-transaction-repository'
import { ListTransaction } from '../list-transactions'

export function makeListTransactions() {
  const transactionsRepository = new PrismaTransactionRepository()
  const listTransactions = new ListTransaction(transactionsRepository)

  return listTransactions
}
