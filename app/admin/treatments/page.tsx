import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import Treatment, { type ITreatment } from '@/lib/models/Treatment'
import { Button } from '@/components/ui/button'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TreatmentsTable } from './TreatmentsTable'

export const dynamic = 'force-dynamic'

export default async function AdminTreatmentsPage() {
  await connectToDatabase()
  const treatments = await Treatment.find().sort({ order: 1 }).lean<ITreatment[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Treatments</h1>
          <p className="text-muted-foreground text-sm">
            {treatments.length} total — drag rows to change display order
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/treatments/new">Add treatment</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Avg cost (USD)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TreatmentsTable treatments={JSON.parse(JSON.stringify(treatments))} />
      </Table>
    </div>
  )
}
