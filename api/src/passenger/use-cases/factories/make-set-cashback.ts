import { PrismaPassengerRepository } from 'src/passenger/repositories/prisma-repository/prisma-passenger-repository'
import { SetCashBackUseCase } from '../set-cashback'

export function makeSetCashback() {
  const passengerRepository = new PrismaPassengerRepository()
  const setCashbackUseCase = new SetCashBackUseCase(passengerRepository)

  return setCashbackUseCase
}
