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

const BATCH_SIZE = 5000 // Ajuste o tamanho do lote conforme necessário

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
          let batch: Passenger[] = []

          for (const passenger of passengers) {
            batch.push(passenger)

            if (batch.length === BATCH_SIZE) {
              await processBatch(batch)
              batch = []
            }
          }

          // Processa qualquer lote restante
          if (batch.length > 0) {
            await processBatch(batch)
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

async function processBatch(batch: Passenger[]) {
  try {
    const registerPassengerUseCase = makeRegisterPassenger()
    await Promise.all(
      batch.map((passenger) =>
        registerPassengerUseCase.execute({
          name: passenger.name,
          code: passenger.code,
        }),
      ),
    )
  } catch (err) {
    app.log.error('Error processing batch:', err)
    throw err // Re-throw error to handle it in the main handler
  }
}
