import { api } from '@/lib/axios'

export interface registerPassengerBody {
  name: string
  code: string
}

export async function createPassanger({ name, code }: registerPassengerBody) {
  await api.post('/passenger', { name, code })
}
