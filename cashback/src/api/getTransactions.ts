import { api } from '@/lib/axios'

interface GetTransactionResponse {
  id: string
  passenger_code: string
  ticketPrice: number
  local: string
  createdAt: Date
}
export async function getTransactions() {
  const response = await api.get<GetTransactionResponse[]>('/transaction')

  return response.data
}
