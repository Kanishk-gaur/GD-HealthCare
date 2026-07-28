import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import Doctor, { type IDoctor } from '@/lib/models/Doctor'
import Hospital from '@/lib/models/Hospital'
import { DoctorForm } from '@/app/admin/doctors/DoctorForm'
import { updateDoctor } from '@/app/actions/doctors'

export const dynamic = 'force-dynamic'

export default async function EditDoctorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const [doctor, hospitalOptions] = await Promise.all([
    Doctor.findById(id).lean<IDoctor>(),
    Hospital.find().select('slug name').sort({ name: 1 }).lean<{ slug: string; name: string }[]>(),
  ])

  if (!doctor) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit {doctor.name}</h1>
      <DoctorForm action={updateDoctor.bind(null, id)} doctor={doctor} hospitalOptions={hospitalOptions} />
    </div>
  )
}