import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryTransactionRepository } from '../repositories/in-memory/in-memory-transaction-repository'
import { RegisterTransaction } from './register-transaction'
import { InMemoryPassengerRepository } from '../../passenger/repositories/in-memory/in-memory-passenger-repository'

let transactionRepository: InMemoryTransactionRepository
let passangerRepository: InMemoryPassengerRepository
let sut: RegisterTransaction

describe('register Use Case', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()
    passangerRepository = new InMemoryPassengerRepository()
    sut = new RegisterTransaction(transactionRepository, passangerRepository)
  })

  it('should be able to register of transactions', async () => {
    const passenger = await passangerRepository.create({
      name: 'john doe',
      code: '1234',
    })

    const transaction = await sut.execute({
      passenger_code: passenger.code,
      ticketPrice: 250.0,
      point: 'Planaltina-DF',
      local: 'planaltina-go',
    })

    expect(transaction.id).toEqual(expect.any(String))
  })
})
