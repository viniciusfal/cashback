import { Prisma } from '@prisma/client'
import { PassengerRepository } from '../passenger-repository'
import { prisma } from 'src/lib/prisma'

export class PrismaPassengerRepository implements PassengerRepository {
  async list() {
    const passengers = await prisma.passenger.findMany()

    return passengers
  }

  async create(data: Prisma.PassengerCreateInput) {
    const passenger = await prisma.passenger.create({
      data,
    })

    return passenger
  }

  async findByCode(code: string) {
    const passenger = await prisma.passenger.findUnique({
      where: {
        code,
      },
    })

    return passenger
  }

  async findById(id: string) {
    const passenger = await prisma.passenger.findUnique({
      where: {
        id,
      },
    })

    return passenger
  }

  async setCashback(passenger_id: string) {
    const passenger = await prisma.passenger.findUnique({
      where: {
        id: passenger_id,
      },
    })

    const newCashbackvalue = !passenger?.cashBack

    const passengerUpdate = await prisma.passenger.update({
      where: {
        id: passenger_id,
      },
      data: {
        cashBack: newCashbackvalue,
      },
    })

    return passengerUpdate.cashBack
  }
}
