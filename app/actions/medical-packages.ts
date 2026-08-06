'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import MedicalPackage from '@/lib/models/MedicalPackage'
import { parseLines } from '@/lib/admin-utils'
import { requireAdmin } from '@/lib/require-admin'

function buildMedicalPackageData(formData: FormData) {
  const icuDays = Number(formData.get('icuDays') || 0)
  const wardDays = Number(formData.get('wardDays') || 0)
  const los = String(formData.get('los') || '').trim()

  return {
    procedure: String(formData.get('procedure') || ''),
    specialty: String(formData.get('specialty') || ''),
    hospital: String(formData.get('hospital') || ''),
    // Derived from the day counts when left blank, so the two never disagree.
    los: los || `${icuDays}+${wardDays}`,
    icuDays,
    wardDays,
    economyPrice: Number(formData.get('economyPrice') || 0),
    doublePrice: Number(formData.get('doublePrice') || 0),
    singlePrice: Number(formData.get('singlePrice') || 0),
    notes: String(formData.get('notes') || ''),
    includes: parseLines(formData.get('includes')),
  }
}

export async function createMedicalPackage(formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  await MedicalPackage.create(buildMedicalPackageData(formData))
  revalidatePath('/admin/medical-packages')
  revalidatePath('/')
  redirect('/admin/medical-packages')
}

export async function updateMedicalPackage(id: string, formData: FormData) {
  await requireAdmin()
  await connectToDatabase()
  await MedicalPackage.findByIdAndUpdate(id, buildMedicalPackageData(formData))
  revalidatePath('/admin/medical-packages')
  revalidatePath('/')
  redirect('/admin/medical-packages')
}

export async function deleteMedicalPackage(id: string) {
  await requireAdmin()
  await connectToDatabase()
  await MedicalPackage.findByIdAndDelete(id)
  revalidatePath('/admin/medical-packages')
  revalidatePath('/')
}
