import { api } from '@/lib/axios'
export interface CreditsBody {
  id: string
}

export async function updateCashback({ id }: CreditsBody) {
  await api.patch(`/passenger/${id}`, { cashback: true })
}
