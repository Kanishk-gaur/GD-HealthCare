import { connectToDatabase } from '@/lib/mongodb'
import MedicalPackage from '@/lib/models/MedicalPackage'
import { MedicalPackageForm } from '@/app/admin/medical-packages/MedicalPackageForm'
import { createMedicalPackage } from '@/app/actions/medical-packages'

export const dynamic = 'force-dynamic'

export default async function NewMedicalPackagePage() {
  await connectToDatabase()
  const hospitalOptions = await MedicalPackage.distinct('hospital')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add package</h1>
      <MedicalPackageForm
        action={createMedicalPackage}
        hospitalOptions={hospitalOptions}
      />
    </div>
  )
}
