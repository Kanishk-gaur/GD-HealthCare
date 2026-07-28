import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import Treatment, { type ITreatment } from '@/lib/models/Treatment'
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
import { deleteTreatment } from '@/app/actions/treatments'

export const dynamic = 'force-dynamic'

export default async function AdminTreatmentsPage() {
  await connectToDatabase()
  const treatments = await Treatment.find().sort({ name: 1 }).lean<ITreatment[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Treatments</h1>
          <p className="text-muted-foreground text-sm">{treatments.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/treatments/new">Add treatment</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Avg cost (USD)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {treatments.map((t) => (
            <TableRow key={String(t._id)}>
              <TableCell className="font-medium">{t.name}</TableCell>
              <TableCell>{t.category}</TableCell>
              <TableCell>${t.averageCostUSD}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/treatments/${t._id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton
                  itemName={t.name}
                  action={deleteTreatment.bind(null, String(t._id))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}