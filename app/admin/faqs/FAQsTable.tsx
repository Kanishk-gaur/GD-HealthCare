'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { ReorderableTableBody } from '@/components/admin/ReorderableTableBody'
import { deleteFAQ, reorderFAQs } from '@/app/actions/faqs'
import type { IFAQ } from '@/lib/models/FAQ'

export function FAQsTable({ items }: { items: IFAQ[] }) {
  return (
    <ReorderableTableBody
      items={items}
      onReorder={reorderFAQs}
      renderRow={(item) => (
        <>
          <TableCell className="font-medium">{item.question}</TableCell>
          <TableCell className="text-muted-foreground max-w-md truncate">{item.answer}</TableCell>
          <TableCell className="text-right space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/faqs/${item._id}/edit`}>Edit</Link>
            </Button>
            <DeleteButton itemName={item.question} action={deleteFAQ.bind(null, String(item._id))} />
          </TableCell>
        </>
      )}
    />
  )
}
