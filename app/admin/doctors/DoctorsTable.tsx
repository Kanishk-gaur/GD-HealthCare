'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { ReorderableTableBody } from '@/components/admin/ReorderableTableBody'
import { deleteDoctor, reorderDoctors } from '@/app/actions/doctors'
import type { IDoctor } from '@/lib/models/Doctor'

export function DoctorsTable({ doctors }: { doctors: IDoctor[] }) {
  return (
    <ReorderableTableBody
      items={doctors}
      onReorder={reorderDoctors}
      renderRow={(d) => (
        <>
          <TableCell className="font-medium">{d.name}</TableCell>
          <TableCell>{d.specialization}</TableCell>
          <TableCell>{d.hospital}</TableCell>
          <TableCell className="text-right space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/doctors/${d._id}/edit`}>Edit</Link>
            </Button>
            <DeleteButton itemName={d.name} action={deleteDoctor.bind(null, String(d._id))} />
          </TableCell>
        </>
      )}
    />
  )
}
