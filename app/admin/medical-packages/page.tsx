import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import MedicalPackage, { type IMedicalPackage } from '@/lib/models/MedicalPackage'
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
import { deleteMedicalPackage } from '@/app/actions/medical-packages'

export const dynamic = 'force-dynamic'

export default async function AdminMedicalPackagesPage() {
  await connectToDatabase()
  const packages = await MedicalPackage.find()
    .sort({ hospital: 1, procedure: 1 })
    .lean<IMedicalPackage[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Procedure Packages</h1>
          <p className="text-muted-foreground text-sm">
            {packages.length} packages — shown in the &ldquo;Medical Procedure
            Packages&rdquo; table on the homepage.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/medical-packages/new">Add package</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Procedure</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Stay</TableHead>
            <TableHead className="text-right">Economy</TableHead>
            <TableHead className="text-right">Double</TableHead>
            <TableHead className="text-right">Single</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((p) => (
            <TableRow key={String(p._id)}>
              <TableCell className="font-medium">{p.procedure}</TableCell>
              <TableCell>
                <Badge variant="secondary">{p.specialty}</Badge>
              </TableCell>
              <TableCell>{p.hospital}</TableCell>
              <TableCell className="whitespace-nowrap">
                {p.icuDays}d ICU + {p.wardDays}d ward
              </TableCell>
              <TableCell className="text-right">
                ${p.economyPrice.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ${p.doublePrice.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ${p.singlePrice.toLocaleString()}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/medical-packages/${p._id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton
                  itemName={p.procedure}
                  action={deleteMedicalPackage.bind(null, String(p._id))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
