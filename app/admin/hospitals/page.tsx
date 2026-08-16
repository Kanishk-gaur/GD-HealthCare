import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import Hospital, { type IHospital } from '@/lib/models/Hospital'
import { Button } from '@/components/ui/button'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { HospitalsTable } from './HospitalsTable'

export const dynamic = 'force-dynamic'

export default async function AdminHospitalsPage() {
  await connectToDatabase()
  const hospitals = await Hospital.find().sort({ order: 1 }).lean<IHospital[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Hospitals</h1>
          <p className="text-muted-foreground text-sm">
            {hospitals.length} total — drag rows to change display order
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/hospitals/new">Add hospital</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Beds</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <HospitalsTable hospitals={JSON.parse(JSON.stringify(hospitals))} />
      </Table>
    </div>
  )
}
