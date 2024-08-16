import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from '@/api/sign-in'

const signInForm = z.object({
  name: z.string(),
  password: z.string(),
})
type SignInForm = z.infer<typeof signInForm>

export function SingIn() {
  const { register, handleSubmit } = useForm<SignInForm>()
  const navigate = useNavigate()

  const { mutateAsync: session } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await session({ name: data.name, password: data.password })

      toast.success('Seja Bem vindo.')

      navigate('/')
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="mb-2 text-sm text-muted-foreground">
            Painel teste de aplicações de Cashback
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do usuario</Label>
            <Input
              id="name"
              type="text"
              className="p-2"
              {...register('name')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              className="p-2"
              {...register('password')}
            />
          </div>

          <Button className="w-full py-2" type="submit">
            Acessar painel
          </Button>
        </form>
      </div>
    </>
  )
}
