import { prisma } from 'src/lib/prisma'
import {
  CreateTransaction,
  TransactionRepository,
} from '../transaction-repository'

export class PrismaTransactionRepository implements TransactionRepository {
  async list() {
    const transactions = await prisma.transaction.findMany()

    return transactions
  }

  async create(data: CreateTransaction) {
    const transaction = await prisma.transaction.create({
      data,
    })

    return transaction
  }
}
