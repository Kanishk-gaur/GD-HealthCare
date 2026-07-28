'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import Doctor from '@/lib/models/Doctor'
import Hospital from '@/lib/models/Hospital'
import { parseLines, toSlug } from '@/lib/admin-utils'

async function buildDoctorData(formData: FormData) {
  const name = String(formData.get('name') || '')
  const hospitalSlug = String(formData.get('hospitalSlug') || '')

  let hospitalName = ''
  if (hospitalSlug) {
    const hospitalDoc = await Hospital.findOne({ slug: hospitalSlug }).lean<{ name: string }>()
    hospitalName = hospitalDoc?.name || ''
  }

  return {
    slug: toSlug(String(formData.get('slug') || name)),
    name,
    specialization: String(formData.get('specialization') || ''),
    subSpecialty: String(formData.get('subSpecialty') || ''),
    hospital: hospitalName,
    hospitalSlug,
    department: String(formData.get('department') || ''),
    country: String(formData.get('country') || ''),
    city: String(formData.get('city') || ''),
    image: String(formData.get('image') || ''),
    rating: Number(formData.get('rating') || 0),
    reviews: Number(formData.get('reviews') || 0),
    experience: Number(formData.get('experience') || 0),
    qualification: String(formData.get('qualification') || ''),
    languages: parseLines(formData.get('languages')),
    consultationFee: Number(formData.get('consultationFee') || 0),
    description: String(formData.get('description') || ''),
    longBio: String(formData.get('longBio') || ''),
    expertiseAreas: parseLines(formData.get('expertiseAreas')),
    majorProcedures: parseLines(formData.get('majorProcedures')),
    awards: parseLines(formData.get('awards')),
    memberships: parseLines(formData.get('memberships')),
    intlExperience: parseLines(formData.get('intlExperience')),
    recommendedTreatments: parseLines(formData.get('recommendedTreatments')),
  }
}

export async function createDoctor(formData: FormData) {
  await connectToDatabase()
  const data = await buildDoctorData(formData)
  await Doctor.create(data)
  revalidatePath('/admin/doctors')
  revalidatePath('/doctors')
  redirect('/admin/doctors')
}

export async function updateDoctor(id: string, formData: FormData) {
  await connectToDatabase()
  const data = await buildDoctorData(formData)
  await Doctor.findByIdAndUpdate(id, data)
  revalidatePath('/admin/doctors')
  revalidatePath('/doctors')
  revalidatePath(`/doctors/${data.slug}`)
  redirect('/admin/doctors')
}

export async function deleteDoctor(id: string) {
  await connectToDatabase()
  await Doctor.findByIdAndDelete(id)
  revalidatePath('/admin/doctors')
  revalidatePath('/doctors')
}