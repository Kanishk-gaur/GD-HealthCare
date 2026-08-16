import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import MedicalPackage, { type IMedicalPackage } from '@/lib/models/MedicalPackage'
import { Button } from '@/components/ui/button'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MedicalPackagesTable } from './MedicalPackagesTable'

export const dynamic = 'force-dynamic'

export default async function AdminMedicalPackagesPage() {
  await connectToDatabase()
  const packages = await MedicalPackage.find().sort({ order: 1 }).lean<IMedicalPackage[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Procedure Packages</h1>
          <p className="text-muted-foreground text-sm">
            {packages.length} packages — shown in the &ldquo;Medical Procedure
            Packages&rdquo; table on the homepage. Drag rows to change display order.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/medical-packages/new">Add package</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
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
        <MedicalPackagesTable packages={JSON.parse(JSON.stringify(packages))} />
      </Table>
    </div>
  )
}
