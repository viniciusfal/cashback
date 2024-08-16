import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users_repository'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  name: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUSeCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByName(name)

    if (!user) {
      throw new Error('Invalid credentials errors')
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new Error('Invalid credentials errors')
    }
    return { user }
  }
}
