import { Passenger, Prisma } from '@prisma/client'
import { PassengerRepository } from '../passenger-repository'
import { randomUUID } from 'crypto'

export class InMemoryPassengerRepository implements PassengerRepository {
  public items: Passenger[] = []

  async list() {
    const passengers = this.items.map((passenger) => passenger)

    return passengers
  }

  async create(data: Prisma.PassengerCreateInput) {
    const passenger = {
      id: randomUUID(),
      name: data.name,
      code: data.code,
      cashBack: false,
    }

    this.items.push(passenger)

    return passenger
  }

  async findByCode(code: string) {
    const passenger = this.items.find((item) => item.code === code)

    if (!passenger) {
      return null
    }

    return passenger
  }

  async findById(id: string) {
    const passenger = this.items.find((item) => item.id === id)

    if (!passenger) {
      return null
    }

    return passenger
  }

  async setCashback(passenger_id: string) {
    const passengerIndex = this.items.findIndex(
      (item) => item.id === passenger_id,
    )

    const currentCashback = this.items[passengerIndex].cashBack
    this.items[passengerIndex].cashBack = !currentCashback

    return this.items[passengerIndex].cashBack
  }
}
