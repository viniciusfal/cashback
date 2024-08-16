import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createPassanger } from '@/api/passenger'
import { toast } from 'sonner'
import { CircleAlert } from 'lucide-react'

const passangerBody = z.object({
  name: z.string(),
  code: z.string(),
})

type PassangerBody = z.infer<typeof passangerBody>

export function RegisterPassenger() {
  const { register, handleSubmit } = useForm<PassangerBody>()

  const { mutateAsync: passanger } = useMutation({
    mutationFn: createPassanger,
  })

  async function handlePassanger(data: PassangerBody) {
    try {
      await passanger({
        name: data.name.toUpperCase(),
        code: data.code,
      })
      toast.success('Passageiro cadastrado com sucesso')
    } catch (err) {
      console.log(data)
      toast.error('Erro ao cadastrar')
    }
  }
  return (
    <>
      <Helmet title="Cadastrar" />
      <div className="text-center mt-8">
        <h1 className="text-bold text-2xl ">Cadastrar Passageiro</h1>
      </div>

      <div className="flex flex-col items-center w-1/2 mx-auto mt-4 ">
        <form className="space-y-4" onSubmit={handleSubmit(handlePassanger)}>
          <div className="space-y-1">
            <Label className="text-sm">Nome</Label>
            <Input id="name" type="text" {...register('name')} />
          </div>

          <div className="space-y-1">
            <Label className="text-sm">Codigo</Label>
            <Input id="code" type="number" {...register('code')} />
          </div>

          <Button type="submit" className="w-full">
            Cadastrar
          </Button>

          <footer className="flex items-start gap-1 w-full pt-4 text-xs text-muted-foreground  ">
            <CircleAlert className="w-4 h-4 " />
            Preencha o nome e o codigo do passageiro conforme esta cadastrado no
            Webgerencial (Transdata)
          </footer>
        </form>
      </div>
    </>
  )
}
