import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users_repository'
import { randomUUID } from 'crypto'

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      password: data.password,
    }

    this.items.push(user)

    return user
  }

  async findByName(username: string) {
    const user = this.items.find((item) => item.name === username)

    if (!user) {
      return null
    }

    return user
  }

  async list() {
    const users = this.items.map((item) => {
      return item
    })

    return users
  }
}
