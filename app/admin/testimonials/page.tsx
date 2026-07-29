import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import Testimonial, { type ITestimonial } from '@/lib/models/Testimonial'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { deleteTestimonial } from '@/app/actions/testimonials'

export const dynamic = 'force-dynamic'

export default async function AdminTestimonialsPage() {
  await connectToDatabase()
  const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean<ITestimonial[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <p className="text-muted-foreground text-sm">{testimonials.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">Add testimonial</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Treatment</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.map((t) => (
            <TableRow key={String(t._id)}>
              <TableCell className="font-medium">{t.name}</TableCell>
              <TableCell>{t.treatment}</TableCell>
              <TableCell>{t.hospital}</TableCell>
              <TableCell>{t.rating} ★</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/testimonials/${t._id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton
                  itemName={t.name}
                  action={deleteTestimonial.bind(null, String(t._id))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}