'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { ReorderableTableBody } from '@/components/admin/ReorderableTableBody'
import { deleteCostComparison, reorderCostComparisons } from '@/app/actions/cost-comparisons'
import type { ICostComparison } from '@/lib/models/CostComparison'

function savingsPercent(usaCost: number, indiaCost: number) {
  if (!usaCost) return '—'
  return `${Math.round(((usaCost - indiaCost) / usaCost) * 100)}%`
}

export function CostComparisonsTable({ items }: { items: ICostComparison[] }) {
  return (
    <ReorderableTableBody
      items={items}
      onReorder={reorderCostComparisons}
      renderRow={(item) => (
        <>
          <TableCell className="font-medium">{item.name}</TableCell>
          <TableCell>{item.category || '—'}</TableCell>
          <TableCell className="text-right">${item.usaCost.toLocaleString()}</TableCell>
          <TableCell className="text-right">${item.indiaCost.toLocaleString()}</TableCell>
          <TableCell className="text-right">{savingsPercent(item.usaCost, item.indiaCost)}</TableCell>
          <TableCell className="text-right space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/cost-comparisons/${item._id}/edit`}>Edit</Link>
            </Button>
            <DeleteButton
              itemName={item.name}
              action={deleteCostComparison.bind(null, String(item._id))}
            />
          </TableCell>
        </>
      )}
    />
  )
}
