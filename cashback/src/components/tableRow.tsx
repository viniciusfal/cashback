import { TableCell, TableRow } from '@/components/ui/table'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { Credit } from '@/components/credit'
import { Progress } from './ui/progress'

import { useQuery } from '@tanstack/react-query'
import { getPassenger } from '@/api/get-passenger'

export function TableRowContent({ searchQuery }) {
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(0)



  const { data: passengers } = useQuery({
    queryKey: ['passengers'],
    queryFn: getPassenger,
  })

  const filteredPassengers = passengers?.filter(
    (passenger) =>
      passenger.code === searchQuery ||
      passenger.name === (searchQuery.toUpperCase()),

  )

  if (!searchQuery) {
    return null
  }


  return (
    <>
      {filteredPassengers?.map((passenger) => (
        <TableRow
          key={passenger.id}
          className="hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:transition-colors"
        >
          <TableCell className="">{passenger.code}</TableCell>
          <TableCell className="">{passenger.name}</TableCell>
          <TableCell>
            {' '}
            <Credit
              passengerCode={passenger.code}
              passengerName={passenger.name}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
