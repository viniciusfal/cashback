import { PrismaPassengerRepository } from 'src/passenger/repositories/prisma-repository/prisma-passenger-repository'
import { ListPassenger } from '../list-passenger'

export function makeListPassenger() {
  const passengerRepository = new PrismaPassengerRepository()
  const registerPassengerUseCase = new ListPassenger(passengerRepository)

  return registerPassengerUseCase
}
