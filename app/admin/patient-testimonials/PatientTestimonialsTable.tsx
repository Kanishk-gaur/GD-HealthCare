'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TableCell } from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { ReorderableTableBody } from '@/components/admin/ReorderableTableBody'
import { deletePatientTestimonial, reorderPatientTestimonials } from '@/app/actions/patient-testimonials'
import type { IPatientTestimonial } from '@/lib/models/PatientTestimonial'

export function PatientTestimonialsTable({ posts }: { posts: IPatientTestimonial[] }) {
  return (
    <ReorderableTableBody
      items={posts}
      onReorder={reorderPatientTestimonials}
      renderRow={(p) => (
        <>
          <TableCell className="font-medium">{p.title}</TableCell>
          <TableCell>{p.patientName}</TableCell>
          <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
          <TableCell>
            <Badge variant={p.published ? 'default' : 'secondary'}>
              {p.published ? 'Published' : 'Draft'}
            </Badge>
          </TableCell>
          <TableCell className="text-right space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/patient-testimonials/${p._id}/edit`}>Edit</Link>
            </Button>
            <DeleteButton
              itemName={p.title}
              action={deletePatientTestimonial.bind(null, String(p._id))}
            />
          </TableCell>
        </>
      )}
    />
  )
}
