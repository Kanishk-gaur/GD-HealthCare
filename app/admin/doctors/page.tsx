import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import Doctor, { type IDoctor } from '@/lib/models/Doctor'
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
import { deleteDoctor } from '@/app/actions/doctors'

export const dynamic = 'force-dynamic'

export default async function AdminDoctorsPage() {
  await connectToDatabase()
  const doctors = await Doctor.find().sort({ name: 1 }).lean<IDoctor[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Doctors</h1>
          <p className="text-muted-foreground text-sm">{doctors.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/doctors/new">Add doctor</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((d) => (
            <TableRow key={String(d._id)}>
              <TableCell className="font-medium">{d.name}</TableCell>
              <TableCell>{d.specialization}</TableCell>
              <TableCell>{d.hospital}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/doctors/${d._id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton
                  itemName={d.name}
                  action={deleteDoctor.bind(null, String(d._id))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}