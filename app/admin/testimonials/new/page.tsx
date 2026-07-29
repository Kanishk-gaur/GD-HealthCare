import { TestimonialForm } from '@/app/admin/testimonials/TestimonialForm'
import { createTestimonial } from '@/app/actions/testimonials'

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add testimonial</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  )
}