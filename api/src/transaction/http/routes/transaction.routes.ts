import { FastifyInstance } from 'fastify'
import { registerTransaction } from '../controllers/register-transaction'
import { verifyJWT } from 'src/middleware/verify.jws'
import { listTransactions } from '../controllers/list-transactions'

export async function transactionRoutes(app: FastifyInstance) {
  app.post('/transaction', { onRequest: [verifyJWT] }, registerTransaction)
  app.get('/transaction', { onRequest: [verifyJWT] }, listTransactions)
}
