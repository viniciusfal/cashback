import { PrismaUsersRepository } from 'src/user/repositories/prisma-repository/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegister() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
