import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { makeRegister } from 'src/user/use-cases/factories/make-register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(4),
    password: z.string().min(6),
  })

  const { name, password } = registerBodySchema.parse(request.body)

  const password_hash = await hash(password, 6)

  try {
    const registerUseCase = makeRegister()

    await registerUseCase.execute({
      name,
      password: password_hash,
    })
  } catch (err) {
    return reply.status(409).send({ message: err })
  }

  return reply.status(201).send()
}
