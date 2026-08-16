import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import PatientTestimonial, { type IPatientTestimonial } from '@/lib/models/PatientTestimonial'
import { Button } from '@/components/ui/button'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PatientTestimonialsTable } from './PatientTestimonialsTable'

export const dynamic = 'force-dynamic'

export default async function AdminPatientTestimonialsPage() {
  await connectToDatabase()
  const posts = await PatientTestimonial.find().sort({ order: 1 }).lean<IPatientTestimonial[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Patient Testimonials</h1>
          <p className="text-muted-foreground text-sm">
            {posts.length} total — drag rows to change display order
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/patient-testimonials/new">Write new testimonial</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Title</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <PatientTestimonialsTable posts={JSON.parse(JSON.stringify(posts))} />
      </Table>
    </div>
  )
}
