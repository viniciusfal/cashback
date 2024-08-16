import { Passenger } from '@prisma/client'
import { PassengerRepository } from '../repositories/passenger-repository'

interface registerPassengerUseCaseRequest {
  name: string
  code: string
}

interface registerPassengerUseCaseResponse {
  passenger: Passenger
}

export class RegisterPassengerUseCase {
  constructor(private passengerRepository: PassengerRepository) {}

  async execute({
    code,
    name,
  }: registerPassengerUseCaseRequest): Promise<registerPassengerUseCaseResponse> {
    const alreadyExists = await this.passengerRepository.findByCode(code)

    if (alreadyExists) {
      throw new Error('Passenger Already Exists')
    }

    const passenger = await this.passengerRepository.create({
      name,
      code,
    })

    return { passenger }
  }
}
