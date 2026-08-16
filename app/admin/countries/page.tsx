import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import Country, { type ICountry } from '@/lib/models/Country'
import { Button } from '@/components/ui/button'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CountriesTable } from './CountriesTable'

export const dynamic = 'force-dynamic'

export default async function AdminCountriesPage() {
  await connectToDatabase()
  const countries = await Country.find().sort({ order: 1 }).lean<ICountry[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Countries</h1>
          <p className="text-muted-foreground text-sm">
            {countries.length} total — shown on the &ldquo;International Patient
            Services&rdquo; page, grouped by region. Drag rows to change display order.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/countries/new">Add country</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Name</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Patients</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <CountriesTable countries={JSON.parse(JSON.stringify(countries))} />
      </Table>
    </div>
  )
}
