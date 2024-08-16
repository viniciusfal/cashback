import { Transaction } from '@prisma/client'

export interface CreateTransaction {
  id?: string | undefined
  ticketPrice: number
  passenger_code: string
  local: string
  createdAt?: string | Date | undefined
}
export interface TransactionRepository {
  create(data: CreateTransaction): Promise<Transaction>
  list(): Promise<Transaction[]>
}
