import { connectToDatabase } from '@/lib/mongodb'
import Hospital from '@/lib/models/Hospital'
import { DoctorForm } from '@/app/admin/doctors/DoctorForm'
import { createDoctor } from '@/app/actions/doctors'

export const dynamic = 'force-dynamic'

export default async function NewDoctorPage() {
  await connectToDatabase()
  const hospitalOptions = await Hospital.find()
    .select('slug name')
    .sort({ name: 1 })
    .lean<{ slug: string; name: string }[]>()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add doctor</h1>
      <DoctorForm action={createDoctor} hospitalOptions={hospitalOptions} />
    </div>
  )
}