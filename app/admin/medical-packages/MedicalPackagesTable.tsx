'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TableCell } from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { ReorderableTableBody } from '@/components/admin/ReorderableTableBody'
import { deleteMedicalPackage, reorderMedicalPackages } from '@/app/actions/medical-packages'
import type { IMedicalPackage } from '@/lib/models/MedicalPackage'

export function MedicalPackagesTable({ packages }: { packages: IMedicalPackage[] }) {
  return (
    <ReorderableTableBody
      items={packages}
      onReorder={reorderMedicalPackages}
      renderRow={(p) => (
        <>
          <TableCell className="font-medium">{p.procedure}</TableCell>
          <TableCell>
            <Badge variant="secondary">{p.specialty}</Badge>
          </TableCell>
          <TableCell>{p.hospital}</TableCell>
          <TableCell className="whitespace-nowrap">
            {p.icuDays}d ICU + {p.wardDays}d ward
          </TableCell>
          <TableCell className="text-right">${p.economyPrice.toLocaleString()}</TableCell>
          <TableCell className="text-right">${p.doublePrice.toLocaleString()}</TableCell>
          <TableCell className="text-right">${p.singlePrice.toLocaleString()}</TableCell>
          <TableCell className="text-right space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/medical-packages/${p._id}/edit`}>Edit</Link>
            </Button>
            <DeleteButton
              itemName={p.procedure}
              action={deleteMedicalPackage.bind(null, String(p._id))}
            />
          </TableCell>
        </>
      )}
    />
  )
}
