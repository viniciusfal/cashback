import { Transaction } from '@prisma/client'
import {
  CreateTransaction,
  TransactionRepository,
} from '../transaction-repository'
import { randomUUID } from 'crypto'

export class InMemoryTransactionRepository implements TransactionRepository {
  public items: Transaction[] = []

  async list() {
    const transactions = this.items.map((transaction) => transaction)

    return transactions
  }

  async create(data: CreateTransaction) {
    const transaction = {
      id: randomUUID(),
      passenger_code: data.passenger_code,
      ticketPrice: data.ticketPrice,
      local: data.local,
      point: data.point,
      createdAt: new Date(),
    }

    this.items.push(transaction)

    return transaction
  }

  async setTotal() {}
}
