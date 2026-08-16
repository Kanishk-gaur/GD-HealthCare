import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import FAQ, { type IFAQ } from '@/lib/models/FAQ'
import { Button } from '@/components/ui/button'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FAQsTable } from './FAQsTable'

export const dynamic = 'force-dynamic'

export default async function AdminFAQsPage() {
  await connectToDatabase()
  const items = await FAQ.find().sort({ order: 1 }).lean<IFAQ[]>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-sm">
            {items.length} questions — the top 5 (by display order) are shown on the
            homepage. Drag rows to change display order.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/faqs/new">Add question</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <FAQsTable items={JSON.parse(JSON.stringify(items))} />
      </Table>
    </div>
  )
}
