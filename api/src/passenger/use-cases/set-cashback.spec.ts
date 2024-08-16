import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPassengerRepository } from '../repositories/in-memory/in-memory-passenger-repository'
import { SetCashBackUseCase } from './set-cashback'

let passengerRepository: InMemoryPassengerRepository
let sut: SetCashBackUseCase

describe('register Use Case', () => {
  beforeEach(() => {
    passengerRepository = new InMemoryPassengerRepository()
    sut = new SetCashBackUseCase(passengerRepository)
  })

  it('should be able to cashback', async () => {
    const passenger = await passengerRepository.create({
      name: 'john doe',
      code: '1234',
    })

    await sut.execute({
      passenger_id: passenger.id,
    })

    expect(passenger.cashBack).toBe(true)
  })
})
