import { makeListPassenger } from '@/passenger/use-cases/factories/make-list-passengers'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listPassengers(_: FastifyRequest, reply: FastifyReply) {
  try {
    const listPassengersUseCase = makeListPassenger()

    const response = await listPassengersUseCase.execute()

    return reply.status(200).send(response)
  } catch (err) {
    return reply.status(404).send({ message: err })
  }
}
