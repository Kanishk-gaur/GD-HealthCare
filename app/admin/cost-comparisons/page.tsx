import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import CostComparison, { type ICostComparison } from '@/lib/models/CostComparison'
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
import { deleteCostComparison } from '@/app/actions/cost-comparisons'

export const dynamic = 'force-dynamic'

function savingsPercent(usaCost: number, indiaCost: number) {
  if (!usaCost) return '—'
  return `${Math.round(((usaCost - indiaCost) / usaCost) * 100)}%`
}

export default async function AdminCostComparisonsPage() {
  await connectToDatabase()
  const items = await CostComparison.find()
    .sort({ name: 1 })
    .lean<ICostComparison[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Cost Comparison</h1>
          <p className="text-muted-foreground text-sm">
            {items.length} procedures — shown in the &ldquo;India vs Western
            Countries&rdquo; table on the homepage.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/cost-comparisons/new">Add procedure</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Procedure</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">USA cost</TableHead>
            <TableHead className="text-right">India cost</TableHead>
            <TableHead className="text-right">Savings</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={String(item._id)}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category || '—'}</TableCell>
              <TableCell className="text-right">
                ${item.usaCost.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ${item.indiaCost.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {savingsPercent(item.usaCost, item.indiaCost)}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/cost-comparisons/${item._id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton
                  itemName={item.name}
                  action={deleteCostComparison.bind(null, String(item._id))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
