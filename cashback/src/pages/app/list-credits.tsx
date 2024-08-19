import { useEffect, useState } from 'react'
import { getPassenger } from '@/api/get-passenger'
import { getTransactions } from '@/api/getTransactions'
import { DialogSetCredits } from '@/components/dialog-set-credits'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { format } from 'date-fns'
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { DialogCashBack } from '@/components/dialog-cashback'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Coins, ConeIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function ListCredits() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [selectDate, setSelectDate] = useState(new Date())
  const [cashbackConfirmed, setCashbackConfirmed] = useState<{
    [key: string]: boolean
  }>({})
  const [doesFullVisibility, setDoesFullVisibility] = useState(true)

  const simplescash = 'Simples - '
  const supercash = 'Super - '

  const formattedDate = selectDate.toISOString().split('T')[0]

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })

  const { data: passengers, isLoading: isLoadingPassengers } = useQuery({
    queryKey: ['passengers'],
    queryFn: getPassenger,
  })

  useEffect(() => {
    const savedCashbackConfirmed = localStorage.getItem('cashbackConfirmed')
    if (savedCashbackConfirmed) {
      setCashbackConfirmed(JSON.parse(savedCashbackConfirmed))
    }
  }, [])

  function handleDialogOpen(transaction: any) {
    setSelectedTransaction(transaction)
    setDialogOpen(true)
  }

  function handleDialogClose() {
    setDialogOpen(false)
    setSelectedTransaction(null)
  }

  function handleCashbackConfirm(transactionId: string) {
    setCashbackConfirmed((prev) => {
      const updated = { ...prev, [transactionId]: true }
      localStorage.setItem('cashbackConfirmed', JSON.stringify(updated))
      return updated
    })
    handleDialogClose()
  }

  const calcularCashback = (local: string, ticketPrice: number) => {
    if (local === 'PLANALTINA-DF') {
      if (ticketPrice >= 257.4) return `${supercash} R$ 23,40`
      if (ticketPrice >= 128.7) return `${simplescash} R$ 11,70`
    }
    if (local === 'FORMOSA') {
      if (ticketPrice >= 343.2) return `${supercash} R$ 31,20`
      if (ticketPrice >= 171.6) return `${simplescash} R$ 15,60`
    }
    if (local === 'BRASILIA') {
      if (ticketPrice >= 486.2) return `${supercash} R$ 44,20`
      if (ticketPrice >= 243.1) return `${simplescash} R$ 22,10`
    }
    if (local === 'SOBRADINHO') {
      if (ticketPrice >= 159.5 && ticketPrice < 319)
        return `${simplescash} R$ 14,50`
      if (ticketPrice >= 319) return `${simplescash} R$ 29`
    }
    if (local === 'PLANALTINA-GO') {
      if (ticketPrice >= 486.2) return `${supercash} R$ 44,20`
      if (ticketPrice >= 243.1 && ticketPrice < 486.2)
        return `${simplescash} R$ 22,10`
    }
    return 'Nenhum Cashback Disponível'
  }

  // Função para obter detalhes do passageiro
  const getPassengerDetails = (passengerCode: string) => {
    // Encontra o passageiro com base no código
    const passenger = passengers?.find((p) => p.code === passengerCode)

    // Retorna os detalhes do passageiro ou valores padrão se não encontrado
    return passenger
      ? { name: passenger.name, code: passenger.code }
      : { name: 'Desconhecido', code: 'Desconhecido' }
  }

  if (isLoadingTransactions || isLoadingPassengers) {
    return <div>Carregando...</div>
  }

  const startOfDay = (date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
  }

  const endOfDay = (date) => {
    const d = new Date(date)
    d.setHours(23, 59, 59, 999)
    return d
  }

  const filteredCredits = transactions?.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt)
    return (
      transactionDate >= startOfDay(selectDate) &&
      transactionDate <= endOfDay(selectDate)
    )
  })

  const handleDateChange = (event) => {
    // Obtemos a data no formato 'yyyy-mm-dd'
    const newDateString = event.target.value
    const [year, month, day] = newDateString.split('-').map(Number)

    // Criar uma nova data com ano, mês e dia, e definir o horário como início do dia local
    const newDate = new Date(year, month - 1, day)
    newDate.setHours(0, 0, 0, 0)

    setSelectDate(newDate)
  }

  const exportPDF = async () => {
    const doc = new JsPDF()
    doc.setFontSize(14)

    const tableData = doesFullVisibility ? filteredCredits : transactions
    const rows = tableData?.map((transaction, index) => {
      const { name, code } = getPassengerDetails(transaction.passenger_code)
      return [
        index + 1,
        code,
        name,
        `R$ ${transaction.ticketPrice}`,
        transaction.local,
        cashbackConfirmed[transaction.id]
          ? calcularCashback(transaction.local, transaction.ticketPrice)
          : 'Não habilitado',
        format(transaction.createdAt, 'dd/MM/yyyy', { locale: ptBR }),
      ]
    })

    autoTable(doc, {
      head: [['', 'Código', 'Nome', 'Valor', 'Local', 'Cashback', 'Data']],
      body: rows,
      theme: 'striped',
      styles: { halign: 'left', cellPadding: { vertical: 4 } },
      headStyles: {
        fillColor: [4, 120, 87],
        fontStyle: 'bold',
        textColor: [240, 253, 250],
        minCellHeight: 10,
        cellPadding: {
          horizontal: 2,
          vertical: 4,
        },
      },
      bodyStyles: {
        minCellHeight: 10,
        cellWidth: 'auto',
      },
    })

    doc.save('table-cashback.pdf')
  }
  return (
    <div>
      <Helmet title="Historico" />
      <div className="flex space-x-8 items-baseline">
        <h1 className="font-bold text-xl mb-8">Historico de transações</h1>

        <div className="flex gap-2">
          <RadioGroup defaultValue="option-one" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-two"
                id="option-two"
                onClick={() => setDoesFullVisibility(false)}
              />
              <Label htmlFor="option-two" className="text-sm ">
                Todos
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-one"
                id="option-one"
                onClick={() => setDoesFullVisibility(true)}
              />
              <Label htmlFor="option-one" className="text-sm">
                Data
              </Label>
            </div>
          </RadioGroup>
          <Input
            type="date"
            value={formattedDate}
            onChange={handleDateChange}
            className="p-2 w-1/2 text-sm border-"
          />

          <Button onClick={() => exportPDF()} variant="outline">
            Gerar PDF
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[90px]">Código</TableHead>
            <TableHead className="w-[120px]">Nome</TableHead>
            <TableHead className="w-[100px]">Valor</TableHead>
            <TableHead className="w-[100px]">Local</TableHead>
            <TableHead className="w-[120px]">
              <div className="flex space-x-1">
                <Coins className="w-4 h-4" />
                <span>Cashback</span>
              </div>
            </TableHead>
            <TableHead className="w-[120px]">Data e Horário</TableHead>
            <TableHead className="w-[120px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doesFullVisibility
            ? filteredCredits?.map((transaction, index) => {
                const { name, code } = getPassengerDetails(
                  transaction.passenger_code,
                )
                return (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:transition-colors text-sm"
                  >
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell>{code}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>R$ {transaction.ticketPrice}</TableCell>
                    <TableCell>{transaction.local}</TableCell>
                    <TableCell>
                      {cashbackConfirmed[transaction.id] ? (
                        <p className="text-primary">
                          {calcularCashback(
                            transaction.local,
                            transaction.ticketPrice,
                          )}
                        </p>
                      ) : (
                        <Button
                          disabled={transaction.ticketPrice < 128.7}
                          variant={
                            transaction.ticketPrice < 128.7
                              ? 'ghost'
                              : 'default'
                          }
                          onClick={() => handleDialogOpen(transaction)}
                        >
                          Habilitar
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(transaction.createdAt, 'dd/MM/yyyy - HH:mm', {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>
                      <DialogSetCredits
                        passengerCode={transaction.passenger_code}
                      />
                    </TableCell>
                  </TableRow>
                )
              })
            : transactions?.map((transaction, index) => {
                const { name, code } = getPassengerDetails(
                  transaction.passenger_code,
                )
                return (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:transition-colors text-sm"
                  >
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell>{code}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>R$ {transaction.ticketPrice}</TableCell>
                    <TableCell>{transaction.local}</TableCell>
                    <TableCell>
                      {cashbackConfirmed[transaction.id] ? (
                        <p className="text-primary">
                          {calcularCashback(
                            transaction.local,
                            transaction.ticketPrice,
                          )}
                        </p>
                      ) : (
                        <Button
                          disabled={transaction.ticketPrice < 128.7}
                          variant={
                            transaction.ticketPrice < 128.7
                              ? 'ghost'
                              : 'default'
                          }
                          onClick={() => handleDialogOpen(transaction)}
                        >
                          Habilitar
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(transaction.createdAt, 'dd/MM/yyyy - HH:mm', {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>
                      <DialogSetCredits
                        passengerCode={transaction.passenger_code}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
        </TableBody>
      </Table>
      {selectedTransaction && (
        <DialogCashBack
          isOpen={dialogOpen}
          onClose={handleDialogClose}
          onConfirm={() => handleCashbackConfirm(selectedTransaction.id)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  )
}
