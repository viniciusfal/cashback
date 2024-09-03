import multer from 'fastify-multer'
import { parse } from 'csv-parse'
import { Readable } from 'stream'
import { app } from '@/app'
import { makeRegisterPassenger } from '@/passenger/use-cases/factories/make-register-passenger'
import { verifyJWT } from '@/middleware/verify.jws'

const storage = multer.memoryStorage()
const upload = multer({ storage })

interface Passenger {
  name: string
  code: string
}

export async function importPassengers() {
  app.register(multer.contentParser)

  app.post(
    '/upload',
    { onRequest: [verifyJWT], preHandler: upload.single('file') },
    async (request, reply) => {
      const file = (request as any).file

      if (!file) {
        return reply.status(400).send({ error: 'No file uploaded' })
      }

      const passengers: Passenger[] = []

      const parser = parse({
        columns: true,
        skip_empty_lines: true,
      })

      const stream = Readable.from(file.buffer.toString())

      stream.pipe(parser)

      parser.on('readable', () => {
        let record
        while ((record = parser.read())) {
          passengers.push(record)
        }
      })

      parser.on('error', (err: Error) => {
        app.log.error(err.message)
        return reply.status(500).send({ error: 'Failed to parse CSV file' })
      })

      parser.on('end', async () => {
        try {
          for (const passenger of passengers) {
            const registerPassengerUseCase = makeRegisterPassenger()

            await registerPassengerUseCase.execute({
              name: passenger.name,
              code: passenger.code,
            })
          }
          return reply.send({
            status: 'success',
            passengers: passengers.length,
          })
        } catch (err) {
          app.log.error(err)
          return reply
            .status(500)
            .send({ error: 'Failed to save passengers to database' })
        }
      })
    },
  )
}
