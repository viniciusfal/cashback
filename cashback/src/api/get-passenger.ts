import { api } from '@/lib/axios'

interface GetPassengerResponse {
  id: string
  name: string
  code: string
  transaction: []
  cashBack: boolean
}
export async function getPassenger() {
  const response = await api.get<GetPassengerResponse[]>('/passenger')

  return response.data
}
