import { connectToDatabase } from '@/lib/mongodb'
import Hospital from '@/lib/models/Hospital'
import Doctor from '@/lib/models/Doctor'
import { TreatmentForm } from '@/app/admin/treatments/TreatmentForm'
import { createTreatment } from '@/app/actions/treatments'

export const dynamic = 'force-dynamic'

export default async function NewTreatmentPage() {
  await connectToDatabase()
  const [hospitalOptions, doctorOptions] = await Promise.all([
    Hospital.find().select('slug name').sort({ name: 1 }).lean<{ slug: string; name: string }[]>(),
    Doctor.find().select('slug name').sort({ name: 1 }).lean<{ slug: string; name: string }[]>(),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add treatment</h1>
      <TreatmentForm action={createTreatment} hospitalOptions={hospitalOptions} doctorOptions={doctorOptions} />
    </div>
  )
}