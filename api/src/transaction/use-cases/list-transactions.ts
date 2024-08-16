import { TransactionRepository } from '../repositories/transaction-repository'

export class ListTransaction {
  constructor(private transactionsRepository: TransactionRepository) {}

  async execute() {
    const transactions = this.transactionsRepository.list()

    return transactions
  }
}
