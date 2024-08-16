import { makeRegisterPassenger } from 'src/passenger/use-cases/factories/make-register-passenger'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPassenger(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string().min(4),
    code: z.string().min(2),
  })

  const { name, code } = registerBodySchema.parse(request.body)

  try {
    const registerPassengerUseCase = makeRegisterPassenger()

    await registerPassengerUseCase.execute({
      name,
      code,
    })
  } catch (err) {
    return reply.status(409).send({ message: err })
  }
  return reply.status(201).send()
}
