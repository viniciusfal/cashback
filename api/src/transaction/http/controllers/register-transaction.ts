import { makeRegisterTransaction } from 'src/transaction/use-cases/factories/make-register-transaction'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    ticketPrice: z.number(),
    passenger_code: z.string(),
    local: z.string(),
  })

  const { ticketPrice, passenger_code, local } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerTransactionUseCase = makeRegisterTransaction()

    await registerTransactionUseCase.execute({
      ticketPrice,
      passenger_code,
      local,
    })
  } catch (err) {
    return reply.status(400).send()
  }

  return reply.status(200).send()
}
