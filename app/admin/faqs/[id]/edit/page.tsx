import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import FAQ, { type IFAQ } from '@/lib/models/FAQ'
import { FAQForm } from '@/app/admin/faqs/FAQForm'
import { updateFAQ } from '@/app/actions/faqs'

export const dynamic = 'force-dynamic'

export default async function EditFAQPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const faq = await FAQ.findById(id).lean<IFAQ>()

  if (!faq) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit question</h1>
      <FAQForm action={updateFAQ.bind(null, id)} faq={faq} nextOrder={faq.order} />
    </div>
  )
}
