import { FastifyInstance } from 'fastify'
import { registerPassenger } from '../controllers/registerPassenger'
import { listPassengers } from '../controllers/list-passengers'
import { setCashBack } from '../controllers/set-chashback'
import { verifyJWT } from 'src/middleware/verify.jws'

export async function passengerRoutes(app: FastifyInstance) {
  app.post('/passenger', { onRequest: [verifyJWT] }, registerPassenger)
  app.patch('/passenger/:passenger_id', { onRequest: [verifyJWT] }, setCashBack)
  app.get('/passenger', { onRequest: [verifyJWT] }, listPassengers)
}
