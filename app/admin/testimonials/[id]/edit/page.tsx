import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import Testimonial, { type ITestimonial } from '@/lib/models/Testimonial'
import { TestimonialForm } from '@/app/admin/testimonials/TestimonialForm'
import { updateTestimonial } from '@/app/actions/testimonials'

export const dynamic = 'force-dynamic'

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const testimonial = await Testimonial.findById(id).lean<ITestimonial>()

  if (!testimonial) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit testimonial</h1>
      <TestimonialForm action={updateTestimonial.bind(null, id)} testimonial={testimonial} />
    </div>
  )
}