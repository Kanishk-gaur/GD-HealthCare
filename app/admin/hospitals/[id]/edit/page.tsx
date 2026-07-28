import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import Hospital, { type IHospital } from '@/lib/models/Hospital'
import { HospitalForm } from '@/app/admin/hospitals/HospitalForm'
import { updateHospital } from '@/app/actions/hospitals'

export const dynamic = 'force-dynamic'

export default async function EditHospitalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const hospital = await Hospital.findById(id).lean<IHospital>()

  if (!hospital) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit {hospital.name}</h1>
      <HospitalForm action={updateHospital.bind(null, id)} hospital={hospital} />
    </div>
  )
}