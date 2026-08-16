'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import Treatment from '@/lib/models/Treatment'
import { toSlug } from '@/lib/admin-utils'
import { requireAdmin } from '@/lib/require-admin'
import { bulkReorder } from '@/lib/reorder'

function buildTreatmentData(formData: FormData) {
  const name = String(formData.get('name') || '')
  return {
    slug: toSlug(String(formData.get('slug') || name)),
    name,
    category: String(formData.get('category') || ''),
    thumbnailUrl: String(formData.get('thumbnailUrl') || ''),
    startingCostINR: Number(formData.get('startingCostINR') || 0),
    startingCostUSD: Number(formData.get('startingCostUSD') || 0),
    averageCostINR: Number(formData.get('averageCostINR') || 0),
    averageCostUSD: Number(formData.get('averageCostUSD') || 0),
    recoveryTime: String(formData.get('recoveryTime') || ''),
    hospitalStay: String(formData.get('hospitalStay') || ''),
    successRate: String(formData.get('successRate') || ''),
    recommendedHospitalSlugs: formData.getAll('recommendedHospitalSlugs').map(String),
    recommendedDoctorSlugs: formData.getAll('recommendedDoctorSlugs').map(String),
    description: String(formData.get('description') || ''),
  }
}

export async function createTreatment(formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  const data = buildTreatmentData(formData)
  await Treatment.create(data)
  revalidatePath('/admin/treatments')
  revalidatePath('/treatments')
  redirect('/admin/treatments')
}

export async function updateTreatment(id: string, formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  const data = buildTreatmentData(formData)
  await Treatment.findByIdAndUpdate(id, data)
  revalidatePath('/admin/treatments')
  revalidatePath('/treatments')
  revalidatePath(`/treatments/${data.slug}`)
  redirect('/admin/treatments')
}

export async function deleteTreatment(id: string) {
  await requireAdmin()
  await connectToDatabase()
  await Treatment.findByIdAndDelete(id)
  revalidatePath('/admin/treatments')
  revalidatePath('/treatments')
}

export async function reorderTreatments(orderedIds: string[]) {
  await requireAdmin()
  await connectToDatabase()
  await bulkReorder(Treatment, orderedIds)
  revalidatePath('/admin/treatments')
  revalidatePath('/treatments')
}