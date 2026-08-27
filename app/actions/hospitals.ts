'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import Hospital from '@/lib/models/Hospital'
import { parseLines, toSlug } from '@/lib/admin-utils'
import { requireAdmin } from '@/lib/require-admin'
import { bulkReorder } from '@/lib/reorder'

function buildHospitalData(formData: FormData) {
  const name = String(formData.get('name') || '')
  return {
    slug: toSlug(String(formData.get('slug') || name)),
    name,
    country: String(formData.get('country') || ''),
    city: String(formData.get('city') || ''),
    address: String(formData.get('address') || ''),
    image: String(formData.get('image') || ''),
    logoUrl: String(formData.get('logoUrl') || ''),
    websiteUrl: String(formData.get('websiteUrl') || ''),
    rating: Number(formData.get('rating') || 0),
    reviews: Number(formData.get('reviews') || 0),
    description: String(formData.get('description') || ''),
    blogDescription: String(formData.get('blogDescription') || ''),
    beds: Number(formData.get('beds') || 0),
    established: formData.get('established') ? Number(formData.get('established')) : undefined,
    specializations: parseLines(formData.get('specializations')),
    accreditations: parseLines(formData.get('accreditations')),
    icuAvailability: formData.get('icuAvailability') === 'on',
    intlServices: parseLines(formData.get('intlServices')),
    departments: parseLines(formData.get('departments')),
    centresOfExcellence: parseLines(formData.get('centresOfExcellence')),
    treatmentsOffered: parseLines(formData.get('treatmentsOffered')),
  }
}

export async function createHospital(formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  const data = buildHospitalData(formData)
  await Hospital.create(data)
  revalidatePath('/admin/hospitals')
  revalidatePath('/hospitals')
  redirect('/admin/hospitals')
}

export async function updateHospital(id: string, formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  const data = buildHospitalData(formData)
  await Hospital.findByIdAndUpdate(id, data)
  revalidatePath('/admin/hospitals')
  revalidatePath('/hospitals')
  revalidatePath(`/hospitals/${data.slug}`)
  redirect('/admin/hospitals')
}

export async function deleteHospital(id: string) {
  await requireAdmin()
  await connectToDatabase()
  await Hospital.findByIdAndDelete(id)
  revalidatePath('/admin/hospitals')
  revalidatePath('/hospitals')
}

export async function reorderHospitals(orderedIds: string[]) {
  await requireAdmin()
  await connectToDatabase()
  await bulkReorder(Hospital, orderedIds)
  revalidatePath('/admin/hospitals')
  revalidatePath('/hospitals')
  revalidatePath('/')
}