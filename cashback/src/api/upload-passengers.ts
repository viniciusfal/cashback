import { api } from '@/lib/axios'

export async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
