import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'john doe',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
