import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import CostComparison, { type ICostComparison } from '@/lib/models/CostComparison'
import { Button } from '@/components/ui/button'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CostComparisonsTable } from './CostComparisonsTable'

export const dynamic = 'force-dynamic'

export default async function AdminCostComparisonsPage() {
  await connectToDatabase()
  const items = await CostComparison.find().sort({ order: 1 }).lean<ICostComparison[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Cost Comparison</h1>
          <p className="text-muted-foreground text-sm">
            {items.length} procedures — shown in the &ldquo;India vs Western
            Countries&rdquo; table on the homepage. Drag rows to change display order.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cost-comparisons/new">Add procedure</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Procedure</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">USA cost</TableHead>
            <TableHead className="text-right">India cost</TableHead>
            <TableHead className="text-right">Savings</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <CostComparisonsTable items={JSON.parse(JSON.stringify(items))} />
      </Table>
    </div>
  )
}
