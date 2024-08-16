import { User } from '@prisma/client'

import { UsersRepository } from '../repositories/users_repository'
interface CreateUseCaseRequest {
  name: string
  password: string
}

interface CreateUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    password,
  }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const alreadyExists = await this.usersRepository.findByName(name)

    if (alreadyExists) {
      throw new Error('Username already exists')
    }
    const user = await this.usersRepository.create({
      name,
      password,
    })

    return { user }
  }
}
