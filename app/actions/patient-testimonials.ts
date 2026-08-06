'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import PatientTestimonial from '@/lib/models/PatientTestimonial'
import { toSlug } from '@/lib/admin-utils'
import { requireAdmin } from '@/lib/require-admin'

function buildPatientTestimonialData(formData: FormData) {
  const title = String(formData.get('title') || '')
  return {
    slug: toSlug(String(formData.get('slug') || title)),
    title,
    author: String(formData.get('author') || ''),
    date: formData.get('date') ? new Date(String(formData.get('date'))) : new Date(),
    image: String(formData.get('image') || ''),
    excerpt: String(formData.get('excerpt') || ''),
    category: String(formData.get('category') || ''),
    content: String(formData.get('content') || ''),
    published: formData.get('published') === 'on',
    patientName: String(formData.get('patientName') || ''),
    patientAge: Number(formData.get('patientAge') || 0),
    patientGender: String(formData.get('patientGender') || ''),
    patientCountry: String(formData.get('patientCountry') || ''),
    treatment: String(formData.get('treatment') || ''),
    hospital: String(formData.get('hospital') || ''),
    doctorSlug: String(formData.get('doctorSlug') || '') || undefined,
    hospitalSlug: String(formData.get('hospitalSlug') || '') || undefined,
    treatmentSlug: String(formData.get('treatmentSlug') || '') || undefined,
    youtubeUrl: String(formData.get('youtubeUrl') || '') || undefined,
  }
}

export async function createPatientTestimonial(formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  const data = buildPatientTestimonialData(formData)
  await PatientTestimonial.create(data)
  revalidatePath('/admin/patient-testimonials')
  revalidatePath('/patient-testimonials')
  redirect('/admin/patient-testimonials')
}

export async function updatePatientTestimonial(id: string, formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  const data = buildPatientTestimonialData(formData)
  await PatientTestimonial.findByIdAndUpdate(id, data)
  revalidatePath('/admin/patient-testimonials')
  revalidatePath('/patient-testimonials')
  revalidatePath(`/patient-testimonials/${data.slug}`)
  redirect('/admin/patient-testimonials')
}

export async function deletePatientTestimonial(id: string) {
  await requireAdmin()
  await connectToDatabase()
  await PatientTestimonial.findByIdAndDelete(id)
  revalidatePath('/admin/patient-testimonials')
  revalidatePath('/patient-testimonials')
}
