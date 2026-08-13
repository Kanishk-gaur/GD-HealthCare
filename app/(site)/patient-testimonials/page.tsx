import { connectToDatabase } from '@/lib/mongodb'
import PatientTestimonial, { type IPatientTestimonial } from '@/lib/models/PatientTestimonial'
import { PatientTestimonialsListClient } from './PatientTestimonialsListClient'

export const revalidate = 0

export const metadata = {
  title: 'Patient Testimonials | GD Healthcare',
  description: 'Real patient stories, treatment journeys, and outcomes from GD Healthcare.',
}

export default async function PatientTestimonialsListPage() {
  await connectToDatabase()
  const posts = await PatientTestimonial.find({ published: true })
    .sort({ date: -1 })
    .lean<IPatientTestimonial[]>()
  const serialized = JSON.parse(JSON.stringify(posts))

  return <PatientTestimonialsListClient posts={serialized} />
}
