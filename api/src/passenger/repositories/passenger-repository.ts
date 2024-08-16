import { Passenger, Prisma } from '@prisma/client'

export interface PassengerRepository {
  create(data: Prisma.PassengerCreateInput): Promise<Passenger>
  findByCode(code: string): Promise<Passenger | null>
  findById(id: string): Promise<Passenger | null>
  setCashback(passenger_id: string): Promise<boolean>
  list(): Promise<Passenger[]>
}
