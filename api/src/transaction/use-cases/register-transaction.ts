import { Transaction } from '@prisma/client'
import {
  CreateTransaction,
  TransactionRepository,
} from '../repositories/transaction-repository'
import { PassengerRepository } from 'src/passenger/repositories/passenger-repository'

export class RegisterTransaction {
  constructor(
    private transactionRepository: TransactionRepository,
    private passengerRepository: PassengerRepository,
  ) {}

  async execute({
    ticketPrice,
    passenger_code,
    local,
    point,
  }: CreateTransaction): Promise<Transaction> {
    const transaction = await this.transactionRepository.create({
      ticketPrice,
      passenger_code,
      local: local.toUpperCase(),
      point: point.toUpperCase(),
    })

    return transaction
  }
}
