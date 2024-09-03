import { api } from '@/lib/axios'
export interface CreditsBody {
  ticketPrice: number
  passenger_code: string
  local: string
  point: string
}

export async function credits({
  ticketPrice,
  local,
  passenger_code,
  point,
}: CreditsBody) {
  await api.post('/transaction', { ticketPrice, passenger_code, local, point })
}
