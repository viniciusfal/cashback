import { Passenger } from '@prisma/client'
import { PassengerRepository } from '../repositories/passenger-repository'

export class ListPassenger {
  constructor(private passengerRepository: PassengerRepository) {}

  async execute(): Promise<Passenger[]> {
    const passengers = await this.passengerRepository.list()

    return passengers
  }
}
