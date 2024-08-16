import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { AuthenticateUSeCase } from './authenticate'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUserRepository
let sut: AuthenticateUSeCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new AuthenticateUSeCase(usersRepository)
  })

  it('should be able to Authenticate', async () => {
    await usersRepository.create({
      name: 'john doe',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      name: 'john doe',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
