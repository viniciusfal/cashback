import { api } from '@/lib/axios'

export async function uploadCredits(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  await api.post('/upload-credits', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
