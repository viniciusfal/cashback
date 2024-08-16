import fastify from 'fastify'
import { usersRoutes } from './user/http/routes/user.routes'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyMultipart from '@fastify/multipart'
import { passengerRoutes } from './passenger/http/routes/passanger.routes'
import { transactionRoutes } from './transaction/http/routes/transaction.routes'
import { env } from './env'
import cors from '@fastify/cors'
import { importPassengers } from './passenger/http/controllers/import-passengers'
import { importTransactions } from './transaction/http/controllers/import-transactions'

export const app = fastify()
const allowedOrigins = ['http://localhost:3333', 'http://localhost:5173']

app.register(cors, {
  credentials: true,
  allowedHeaders: ['content-type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  origin: (origin, cb) => {
    if (!origin) {
      cb(null, true)
      return
    }

    if (allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed'), false)
    }
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyMultipart)
app.register(fastifyCookie)
app.register(importPassengers)
app.register(importTransactions)

app.register(usersRoutes)
app.register(passengerRoutes)
app.register(transactionRoutes)
