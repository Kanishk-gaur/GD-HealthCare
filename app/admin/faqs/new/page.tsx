import { connectToDatabase } from '@/lib/mongodb'
import FAQ from '@/lib/models/FAQ'
import { FAQForm } from '@/app/admin/faqs/FAQForm'
import { createFAQ } from '@/app/actions/faqs'

export default async function NewFAQPage() {
  await connectToDatabase()
  const count = await FAQ.countDocuments()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add question</h1>
      <FAQForm action={createFAQ} nextOrder={count} />
    </div>
  )
}
