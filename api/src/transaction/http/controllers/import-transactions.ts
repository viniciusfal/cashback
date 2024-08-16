import multer from 'fastify-multer'
import { parse } from 'csv-parse'
import { Readable } from 'stream'
import { app } from '@/app'
import { verifyJWT } from '@/middleware/verify.jws'
import { makeRegisterTransaction } from '@/transaction/use-cases/factories/make-register-transaction'

const storage = multer.memoryStorage()
const upload = multer({ storage })

interface Transaction {
  passenger_code: string
  ticketPrice: number
  local: string
}

export async function importTransactions() {
  app.register(multer.contentParser)

  app.post(
    '/upload-credits',
    { onRequest: [verifyJWT], preHandler: upload.single('file') },
    async (request, reply) => {
      const file = (request as any).file

      if (!file) {
        return reply.status(400).send({ error: 'No file uploaded' })
      }

      const transactions: Transaction[] = []

      const parser = parse({
        columns: true,
        skip_empty_lines: true,
      })

      const stream = Readable.from(file.buffer.toString())

      stream.pipe(parser)

      parser.on('readable', () => {
        let record
        while ((record = parser.read())) {
          transactions.push(record)
        }
      })

      parser.on('error', (err: Error) => {
        app.log.error(err.message)
        return reply.status(500).send({ error: 'Failed to parse CSV file' })
      })

      parser.on('end', async () => {
        try {
          console.log('Transactions:', transactions)
          for (const transaction of transactions) {
            const registerTransactionUseCase = makeRegisterTransaction()

            await registerTransactionUseCase.execute({
              passenger_code: transaction.passenger_code,
              ticketPrice: parseInt(transaction.ticketPrice.toString()),
              local: transaction.local,
            })

            console.log(transactions)
          }
          return reply.send({
            status: 'success',
            transactions: transactions.length,
          })
        } catch (err) {
          app.log.error(err)
          return reply
            .status(500)
            .send({ error: 'Failed to save transactions to database' })
        }
      })
    },
  )
}
