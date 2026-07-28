import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import Hospital, { type IHospital } from '@/lib/models/Hospital'
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
import { deleteHospital } from '@/app/actions/hospitals'

export const dynamic = 'force-dynamic'

export default async function AdminHospitalsPage() {
  await connectToDatabase()
  const hospitals = await Hospital.find().sort({ name: 1 }).lean<IHospital[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Hospitals</h1>
          <p className="text-muted-foreground text-sm">{hospitals.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/hospitals/new">Add hospital</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Beds</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hospitals.map((h) => (
            <TableRow key={String(h._id)}>
              <TableCell className="font-medium">{h.name}</TableCell>
              <TableCell>{h.city}</TableCell>
              <TableCell>{h.rating}</TableCell>
              <TableCell>{h.beds}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/hospitals/${h._id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton
                  itemName={h.name}
                  action={deleteHospital.bind(null, String(h._id))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}