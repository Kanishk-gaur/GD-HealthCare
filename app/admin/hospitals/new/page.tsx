import { HospitalForm } from '@/app/admin/hospitals/HospitalForm'
import { createHospital } from '@/app/actions/hospitals'

export default function NewHospitalPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add hospital</h1>
      <HospitalForm action={createHospital} />
    </div>
  )
}