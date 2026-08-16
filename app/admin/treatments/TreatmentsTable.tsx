'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { ReorderableTableBody } from '@/components/admin/ReorderableTableBody'
import { deleteTreatment, reorderTreatments } from '@/app/actions/treatments'
import type { ITreatment } from '@/lib/models/Treatment'

export function TreatmentsTable({ treatments }: { treatments: ITreatment[] }) {
  return (
    <ReorderableTableBody
      items={treatments}
      onReorder={reorderTreatments}
      renderRow={(t) => (
        <>
          <TableCell className="font-medium">{t.name}</TableCell>
          <TableCell>{t.category}</TableCell>
          <TableCell>${t.averageCostUSD}</TableCell>
          <TableCell className="text-right space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/treatments/${t._id}/edit`}>Edit</Link>
            </Button>
            <DeleteButton itemName={t.name} action={deleteTreatment.bind(null, String(t._id))} />
          </TableCell>
        </>
      )}
    />
  )
}
