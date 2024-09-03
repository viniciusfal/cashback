import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PencilOff } from 'lucide-react'

interface DialogSetCreditsProps {
  passengerCode: string
}
export function DialogSetCredits({ passengerCode }: DialogSetCreditsProps) {
  console.log(passengerCode)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PencilOff className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar informações</DialogTitle>
          <DialogDescription>
            So altere as informações, Sobre o valor dos creditos
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Valor
            </Label>
            <Input
              id="valueOfCredits"
              defaultValue="210"
              className="col-span-3"
              type="number"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
