import { makeSetCashback } from 'src/passenger/use-cases/factories/make-set-cashback'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function setCashBack(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParams = z.object({
    passenger_id: z.string().uuid(),
  })

  const { passenger_id } = registerParams.parse(request.params)

  try {
    const setCashBackUseCase = makeSetCashback()

    await setCashBackUseCase.execute({
      passenger_id,
    })
  } catch (err) {
    return reply.status(400).send({ message: err })
  }
  return reply.status(200).send()
}
