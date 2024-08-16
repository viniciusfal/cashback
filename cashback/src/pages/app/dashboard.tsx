import { TableRowContent } from '@/components/tableRow'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Helmet title="Passageiros" />
      <div className="">
        <h1 className="text-xl font-bold">Listagem de passageiros</h1>

        <div className="flex items-center gap-1 mt-8 w-1/3 ">
          <Input
            placeholder="Busque por Nome ou Codigo"
            className=" tex-muted-foreground py-4 px-2 placeholder:text-sm bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value) }
          />
          <Button variant={'secondary'} >
            <Search className="w-4 h-4 hover:text-green-500 transition-colors" />
          </Button>
        </div>

        <Table className="mt-4">
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[280px]">Codigo</TableHead>
              <TableHead className="w-[400px]">Nome</TableHead>
              
              <TableHead className="w-[]">Registrar Creditos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRowContent searchQuery={searchQuery} />
          </TableBody>
        </Table>
      </div>
    </>
  )
}
