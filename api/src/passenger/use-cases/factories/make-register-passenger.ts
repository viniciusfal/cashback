import { PrismaPassengerRepository } from 'src/passenger/repositories/prisma-repository/prisma-passenger-repository'
import { RegisterPassengerUseCase } from '../register-passenger'

export function makeRegisterPassenger() {
  const passengerRepository = new PrismaPassengerRepository()
  const registerPassengerUseCase = new RegisterPassengerUseCase(
    passengerRepository,
  )

  return registerPassengerUseCase
}
