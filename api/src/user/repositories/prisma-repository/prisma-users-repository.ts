import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users_repository'
import { prisma } from 'src/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async list() {
    const users = await prisma.user.findMany()

    return users
  }

  async findByName(userName: string) {
    const user = await prisma.user.findUnique({
      where: {
        name: userName,
      },
    })

    return user
  }
}
