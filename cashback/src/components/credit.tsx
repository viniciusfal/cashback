import { credits } from '@/api/credits'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const signInCredits = z.object({
  ticketPrice: z.number(),
  passenger_code: z.string(),
  passenger_name: z.string(),
  local: z.string(),
  point: z.string(),
})

type SignInCredits = z.infer<typeof signInCredits>

interface CreditProps {
  passengerName: string
  passengerCode: string
}

export function Credit({ passengerCode, passengerName }: CreditProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { control, handleSubmit, setValue, register } = useForm<SignInCredits>()

  const { mutateAsync: transaction } = useMutation({
    mutationFn: credits,
  })

  useEffect(() => {
    setValue('passenger_code', passengerCode)
    setValue('passenger_name', passengerName)
  }, [passengerCode, passengerName, setValue])

  async function handleCredit(data: SignInCredits) {
    try {
      await transaction({
        ticketPrice: parseFloat(data.ticketPrice.toString()),
        passenger_code: data.passenger_code,
        local: data.local,
        point: data.point,
      })

      toast.success('Creditos registrados com sucesso')

      setIsOpen(false)
    } catch (err) {
      toast.error('Os Creditos não foram registrados. Tente novamnte')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'link'} className="text-secondary-foreground">
          Creditos
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Registrar Creditos</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <form className="space-y-4" onSubmit={handleSubmit(handleCredit)}>
            <div className="space-y-2">
              <Label htmlFor="passenger_code" className="text-sm ">
                Codigo do Passageiro
              </Label>
              <Input
                id="passenger_code"
                type="text"
                className="p-2"
                disabled
                {...register('passenger_code')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passanger_name" className="text-sm ">
                Nome do Passageiro
              </Label>
              <Input
                id="passanger_name"
                type="text"
                className="p-2"
                disabled
                {...register('passenger_name')}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Destino</Label>
              <Controller
                name="local"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o Destino" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brasilia">Brasilia</SelectItem>
                      <SelectItem value="Formosa">Formosa</SelectItem>
                      <SelectItem value="Planaltina-Go">
                        Planaltina-GO
                      </SelectItem>
                      <SelectItem value="Planaltina-Df">
                        Planaltina-DF
                      </SelectItem>
                      <SelectItem value="Sobradinho">Sobradinho</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Ponto de vendas</Label>
              <Controller
                name="point"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o Ponto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bsb">BSB</SelectItem>
                      <SelectItem value="formosa">Formosa</SelectItem>
                      <SelectItem value="plan-go:s/leste">
                        Plan-GO:S/Leste
                      </SelectItem>
                      <SelectItem value="plan-go:galeria">
                        Plan-GO:Galeria
                      </SelectItem>
                      <SelectItem value="plango:rodoviaria">
                        Plan-GO:Rodoviaria
                      </SelectItem>
                      <SelectItem value="plan-paqueta">
                        Plan-GO:Paqueta
                      </SelectItem>
                      <SelectItem value="plan-df">Planaltina-DF</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Valor</Label>
              <Input
                id="ticketPrice"
                type="text"
                className="p-2"
                {...register('ticketPrice')}
              />
            </div>

            <Button className="w-full py-2" type="submit">
              Cadastrar
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
