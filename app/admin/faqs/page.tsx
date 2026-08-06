import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import FAQ, { type IFAQ } from '@/lib/models/FAQ'
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
import { deleteFAQ } from '@/app/actions/faqs'

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
            {items.length} questions — the top 5 (by display order) are shown on the homepage.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/faqs/new">Add question</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Order</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={String(item._id)}>
              <TableCell className="text-muted-foreground">{item.order}</TableCell>
              <TableCell className="font-medium">{item.question}</TableCell>
              <TableCell className="text-muted-foreground max-w-md truncate">
                {item.answer}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/faqs/${item._id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton
                  itemName={item.question}
                  action={deleteFAQ.bind(null, String(item._id))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
