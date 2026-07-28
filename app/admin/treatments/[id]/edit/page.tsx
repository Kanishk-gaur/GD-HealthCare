import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import Treatment, { type ITreatment } from '@/lib/models/Treatment'
import Hospital from '@/lib/models/Hospital'
import Doctor from '@/lib/models/Doctor'
import { TreatmentForm } from '@/app/admin/treatments/TreatmentForm'
import { updateTreatment } from '@/app/actions/treatments'

export const dynamic = 'force-dynamic'

export default async function EditTreatmentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const [treatment, hospitalOptions, doctorOptions] = await Promise.all([
    Treatment.findById(id).lean<ITreatment>(),
    Hospital.find().select('slug name').sort({ name: 1 }).lean<{ slug: string; name: string }[]>(),
    Doctor.find().select('slug name').sort({ name: 1 }).lean<{ slug: string; name: string }[]>(),
  ])

  if (!treatment) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit {treatment.name}</h1>
      <TreatmentForm
        action={updateTreatment.bind(null, id)}
        treatment={treatment}
        hospitalOptions={hospitalOptions}
        doctorOptions={doctorOptions}
      />
    </div>
  )
}