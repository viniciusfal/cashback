import React, { useState, useCallback } from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import Papa from 'papaparse'

import { useMutation } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'
import { uploadCredits } from '@/api/upload-transactions'
import { Helmet } from 'react-helmet-async'

interface DataRow {
  passenger_code: string
  ticketPrice: number
  local: string
}

export const ImportCredits: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([])

  const { mutateAsync: uploadFileMutate } = useMutation({
    mutationFn: uploadCredits, // Função atualizada para uploadFile
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            const parsedData: DataRow[] = results.data.map((row: any) => ({
              passenger_code: row.passenger_code,
              ticketPrice: parseFloat(row.ticketPrice),
              local: row.local,
            }))
            setData(parsedData)
          },
          error: (error) => {
            console.error('Parse error:', error)
            toast.error('Erro ao analisar o arquivo.')
          },
        })

        uploadFileMutate(file)
          .then(() => {
            toast.success('Arquivo enviado com sucesso!')
          })
          .catch((error) => {
            console.error('Upload error:', error)
            toast.error('Erro ao enviar o arquivo.')
          })
      }
    },
    [uploadFileMutate],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] } as Accept,
  })

  return (
    <>
      <Helmet title="Importar Creditos" />
      <h1 className="font-bold text-xl mb-8">Importar Creditos</h1>
      <div className="container mx-auto p-4">
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer text-center hover:border-blue-500"
        >
          <Input {...getInputProps()} />
          <p className="text-gray-500">
            Arraste e solte um arquivo .csv aqui, ou clique para selecionar um
            arquivo
          </p>
        </div>
        {data.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Dados Importados:</h3>
            <div className="overflow-auto max-h-96">
              <Table className="table-auto w-full text-left">
                <TableHeader>
                  <TableRow>
                    {Object.keys(data[0]).map((key) => (
                      <TableHead
                        key={key}
                        className="px-4 py-2 border-b border-gray-200 bg-gray-100"
                      >
                        {key}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      {Object.values(row).map((value, i) => (
                        <td
                          key={i}
                          className="px-4 py-2 border-b border-gray-200"
                        >
                          {value}
                        </td>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
