import { api } from '@/lib/axios'

interface findPassengerIdBody {
  id: string
}

interface responsePassenger {
  id: string
  name: string
  code: string
  transaction: []
  cashBack: boolean
}

export async function findPassenger({ id }: findPassengerIdBody) {
  const passanger = await api.post<responsePassenger>('/passenger', { id })

  return passanger
}
