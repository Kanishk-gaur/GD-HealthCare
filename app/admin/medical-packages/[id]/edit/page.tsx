import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import MedicalPackage, { type IMedicalPackage } from '@/lib/models/MedicalPackage'
import { MedicalPackageForm } from '@/app/admin/medical-packages/MedicalPackageForm'
import { updateMedicalPackage } from '@/app/actions/medical-packages'

export const dynamic = 'force-dynamic'

export default async function EditMedicalPackagePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const [pkg, hospitalOptions] = await Promise.all([
    MedicalPackage.findById(id).lean<IMedicalPackage>(),
    MedicalPackage.distinct('hospital'),
  ])

  if (!pkg) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit {pkg.procedure}</h1>
      <MedicalPackageForm
        action={updateMedicalPackage.bind(null, id)}
        pkg={pkg}
        hospitalOptions={hospitalOptions}
      />
    </div>
  )
}
