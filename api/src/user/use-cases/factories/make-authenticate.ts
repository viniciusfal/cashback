import { PrismaUsersRepository } from 'src/user/repositories/prisma-repository/prisma-users-repository'
import { AuthenticateUSeCase } from '../authenticate'

export function makeAuthenticate() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUsecase = new AuthenticateUSeCase(usersRepository)

  return authenticateUsecase
}
