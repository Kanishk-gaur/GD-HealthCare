'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import Country from '@/lib/models/Country'
import { parseLines, toSlug } from '@/lib/admin-utils'
import { requireAdmin } from '@/lib/require-admin'
import { bulkReorder } from '@/lib/reorder'

function buildCountryData(formData: FormData) {
  const name = String(formData.get('name') || '')
  return {
    slug: toSlug(String(formData.get('slug') || name)),
    name,
    flag: String(formData.get('flag') || ''),
    region: String(formData.get('region') || ''),
    patients: Number(formData.get('patients') || 0),
    popularTreatments: parseLines(formData.get('popularTreatments')),
  }
}

export async function createCountry(formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  const data = buildCountryData(formData)
  await Country.create(data)
  revalidatePath('/admin/countries')
  revalidatePath('/countries')
  redirect('/admin/countries')
}

export async function updateCountry(id: string, formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  const data = buildCountryData(formData)
  await Country.findByIdAndUpdate(id, data)
  revalidatePath('/admin/countries')
  revalidatePath('/countries')
  redirect('/admin/countries')
}

export async function deleteCountry(id: string) {
  await requireAdmin()
  await connectToDatabase()
  await Country.findByIdAndDelete(id)
  revalidatePath('/admin/countries')
  revalidatePath('/countries')
}

export async function reorderCountries(orderedIds: string[]) {
  await requireAdmin()
  await connectToDatabase()
  await bulkReorder(Country, orderedIds)
  revalidatePath('/admin/countries')
  revalidatePath('/countries')
}
