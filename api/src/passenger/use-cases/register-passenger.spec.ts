import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPassengerRepository } from '../repositories/in-memory/in-memory-passenger-repository'
import { RegisterPassengerUseCase } from './register-passenger'

let passengerRepository: InMemoryPassengerRepository
let sut: RegisterPassengerUseCase

describe('register Use Case', () => {
  beforeEach(() => {
    passengerRepository = new InMemoryPassengerRepository()
    sut = new RegisterPassengerUseCase(passengerRepository)
  })

  it('should be able to register', async () => {
    const { passenger } = await sut.execute({
      name: 'passageiro 1',
      code: '2847',
    })

    expect(passenger.id).toEqual(expect.any(String))
  })

  it('should not be to register with same code twice', async () => {
    const code = '1234'

    await sut.execute({
      name: 'passageiro 1',
      code,
    })

    await expect(() =>
      sut.execute({
        name: 'passageiro-2',
        code,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
