import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import PatientTestimonial, { type IPatientTestimonial } from '@/lib/models/PatientTestimonial'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { deletePatientTestimonial } from '@/app/actions/patient-testimonials'

export const dynamic = 'force-dynamic'

export default async function AdminPatientTestimonialsPage() {
  await connectToDatabase()
  const posts = await PatientTestimonial.find().sort({ date: -1 }).lean<IPatientTestimonial[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Patient Testimonials</h1>
          <p className="text-muted-foreground text-sm">{posts.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/patient-testimonials/new">Write new testimonial</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((p) => (
            <TableRow key={String(p._id)}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
