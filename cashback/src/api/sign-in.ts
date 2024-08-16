import { api } from '@/lib/axios'

export interface SignInBody {
  name: string
  password: string
}

export async function signIn({ name, password }: SignInBody) {
  await api.post('/session', { name, password })
}
