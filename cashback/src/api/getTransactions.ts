import { api } from '@/lib/axios'

interface GetTransactionResponse {
  id: string
  passenger_code: string
  ticketPrice: number
  local: string
  point: string
  createdAt: Date
}
export async function getTransactions(): Promise<GetTransactionResponse[]> {
  const response = await api.get<GetTransactionResponse[]>('/transaction')

  return response.data
}
