import { makeListTransactions } from '@/transaction/use-cases/factories/make-list-transactions'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listTransactions(_: FastifyRequest, reply: FastifyReply) {
  try {
    const listTransactionsUseCase = makeListTransactions()

    const response = await listTransactionsUseCase.execute()

    return reply.status(200).send(response)
  } catch (err) {
    return reply.status(404).send()
  }
}
