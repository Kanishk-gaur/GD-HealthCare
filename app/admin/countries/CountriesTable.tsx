'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { ReorderableTableBody } from '@/components/admin/ReorderableTableBody'
import { deleteCountry, reorderCountries } from '@/app/actions/countries'
import type { ICountry } from '@/lib/models/Country'

export function CountriesTable({ countries }: { countries: ICountry[] }) {
  return (
    <ReorderableTableBody
      items={countries}
      onReorder={reorderCountries}
      renderRow={(c) => (
        <>
          <TableCell className="font-medium">
            <span className="mr-2">{c.flag}</span>
            {c.name}
          </TableCell>
          <TableCell>{c.region}</TableCell>
          <TableCell>{c.patients.toLocaleString()}</TableCell>
          <TableCell className="text-right space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/countries/${c._id}/edit`}>Edit</Link>
            </Button>
            <DeleteButton itemName={c.name} action={deleteCountry.bind(null, String(c._id))} />
          </TableCell>
        </>
      )}
    />
  )
}
