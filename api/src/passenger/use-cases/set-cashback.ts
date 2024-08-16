import { PassengerRepository } from '../repositories/passenger-repository'

interface SetCashBackUseCaseRequest {
  passenger_id: string
}

export class SetCashBackUseCase {
  constructor(private passengerRepository: PassengerRepository) {}

  async execute({ passenger_id }: SetCashBackUseCaseRequest): Promise<boolean> {
    const passenger = await this.passengerRepository.findById(passenger_id)

    if (!passenger) {
      throw new Error('This passenger is not exists')
    }

    const passengerUpdate =
      await this.passengerRepository.setCashback(passenger_id)

    return passengerUpdate
  }
}
