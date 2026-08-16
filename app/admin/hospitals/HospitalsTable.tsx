'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { ReorderableTableBody } from '@/components/admin/ReorderableTableBody'
import { deleteHospital, reorderHospitals } from '@/app/actions/hospitals'
import type { IHospital } from '@/lib/models/Hospital'

export function HospitalsTable({ hospitals }: { hospitals: IHospital[] }) {
  return (
    <ReorderableTableBody
      items={hospitals}
      onReorder={reorderHospitals}
      renderRow={(h) => (
        <>
          <TableCell className="font-medium">{h.name}</TableCell>
          <TableCell>{h.city}</TableCell>
          <TableCell>{h.rating}</TableCell>
          <TableCell>{h.beds}</TableCell>
          <TableCell className="text-right space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/hospitals/${h._id}/edit`}>Edit</Link>
            </Button>
            <DeleteButton itemName={h.name} action={deleteHospital.bind(null, String(h._id))} />
          </TableCell>
        </>
      )}
    />
  )
}
