import { FastifyInstance } from 'fastify'
import { register } from '../controllers/register'
import { authenticate } from '../controllers/authenticate'
import { refresh } from '../controllers/refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)

  app.patch('/token/refresh', refresh)
}
