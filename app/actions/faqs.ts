'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import FAQ from '@/lib/models/FAQ'
import { requireAdmin } from '@/lib/require-admin'
import { bulkReorder } from '@/lib/reorder'

function buildFAQData(formData: FormData) {
  return {
    question: String(formData.get('question') || ''),
    answer: String(formData.get('answer') || ''),
    order: Number(formData.get('order') || 0),
  }
}

export async function createFAQ(formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  await FAQ.create(buildFAQData(formData))
  revalidatePath('/admin/faqs')
  revalidatePath('/')
  redirect('/admin/faqs')
}

export async function updateFAQ(id: string, formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  await FAQ.findByIdAndUpdate(id, buildFAQData(formData))
  revalidatePath('/admin/faqs')
  revalidatePath('/')
  redirect('/admin/faqs')
}

export async function deleteFAQ(id: string) {
  await requireAdmin()
  await connectToDatabase()
  await FAQ.findByIdAndDelete(id)
  revalidatePath('/admin/faqs')
  revalidatePath('/')
}

export async function reorderFAQs(orderedIds: string[]) {
  await requireAdmin()
  await connectToDatabase()
  await bulkReorder(FAQ, orderedIds)
  revalidatePath('/admin/faqs')
  revalidatePath('/')
}
