import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import PatientTestimonial, { type IPatientTestimonial } from '@/lib/models/PatientTestimonial'
import Doctor, { type IDoctor } from '@/lib/models/Doctor'
import Hospital, { type IHospital } from '@/lib/models/Hospital'
import Treatment, { type ITreatment } from '@/lib/models/Treatment'
import { PatientTestimonialDetailClient } from './PatientTestimonialDetailClient'

export const revalidate = 0

export async function generateStaticParams() {
  await connectToDatabase()
  const posts = await PatientTestimonial.find({ published: true }).select('slug').lean<{ slug: string }[]>()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectToDatabase()
  const post = await PatientTestimonial.findOne({ slug, published: true }).lean<IPatientTestimonial>()
  return {
    title: post ? `${post.title} | GD Healthcare Patient Testimonials` : 'Patient Testimonials | GD Healthcare',
    description: post?.excerpt,
  }
}

export default async function PatientTestimonialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectToDatabase()
  const post = await PatientTestimonial.findOne({ slug, published: true }).lean<IPatientTestimonial>()

  if (!post) notFound()

  const [doctor, hospital, treatment, otherPosts] = await Promise.all([
    post.doctorSlug ? Doctor.findOne({ slug: post.doctorSlug }).lean<IDoctor>() : null,
    post.hospitalSlug ? Hospital.findOne({ slug: post.hospitalSlug }).lean<IHospital>() : null,
    post.treatmentSlug ? Treatment.findOne({ slug: post.treatmentSlug }).lean<ITreatment>() : null,
    PatientTestimonial.find({ published: true, slug: { $ne: post.slug } })
      .sort({ date: -1 })
      .limit(4)
      .lean<IPatientTestimonial[]>(),
  ])

  return (
    <PatientTestimonialDetailClient
      post={JSON.parse(JSON.stringify(post))}
      doctor={doctor ? JSON.parse(JSON.stringify(doctor)) : null}
      hospital={hospital ? JSON.parse(JSON.stringify(hospital)) : null}
      treatment={treatment ? JSON.parse(JSON.stringify(treatment)) : null}
      otherPosts={JSON.parse(JSON.stringify(otherPosts))}
    />
  )
}
