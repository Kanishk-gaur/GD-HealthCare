'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import CostComparison from '@/lib/models/CostComparison'
import { requireAdmin } from '@/lib/require-admin'
import { bulkReorder } from '@/lib/reorder'

function buildCostComparisonData(formData: FormData) {
  return {
    name: String(formData.get('name') || ''),
    usaCost: Number(formData.get('usaCost') || 0),
    indiaCost: Number(formData.get('indiaCost') || 0),
    category: String(formData.get('category') || ''),
  }
}

export async function createCostComparison(formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  await CostComparison.create(buildCostComparisonData(formData))
  revalidatePath('/admin/cost-comparisons')
  revalidatePath('/')
  redirect('/admin/cost-comparisons')
}

export async function updateCostComparison(id: string, formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  await CostComparison.findByIdAndUpdate(id, buildCostComparisonData(formData))
  revalidatePath('/admin/cost-comparisons')
  revalidatePath('/')
  redirect('/admin/cost-comparisons')
}

export async function deleteCostComparison(id: string) {
  await requireAdmin()
  await connectToDatabase()
  await CostComparison.findByIdAndDelete(id)
  revalidatePath('/admin/cost-comparisons')
  revalidatePath('/')
}

export async function reorderCostComparisons(orderedIds: string[]) {
  await requireAdmin()
  await connectToDatabase()
  await bulkReorder(CostComparison, orderedIds)
  revalidatePath('/admin/cost-comparisons')
  revalidatePath('/')
}
