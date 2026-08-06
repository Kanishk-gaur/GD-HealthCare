import { PatientTestimonialForm } from '@/app/admin/patient-testimonials/PatientTestimonialForm'
import { createPatientTestimonial } from '@/app/actions/patient-testimonials'
import { connectToDatabase } from '@/lib/mongodb'
import Doctor, { type IDoctor } from '@/lib/models/Doctor'
import Hospital, { type IHospital } from '@/lib/models/Hospital'
import Treatment, { type ITreatment } from '@/lib/models/Treatment'

export default async function NewPatientTestimonialPage() {
  await connectToDatabase()
  const [doctors, hospitals, treatments] = await Promise.all([
    Doctor.find().select('slug name').lean<IDoctor[]>(),
    Hospital.find().select('slug name').lean<IHospital[]>(),
    Treatment.find().select('slug name').lean<ITreatment[]>(),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Write new testimonial</h1>
      <PatientTestimonialForm
        action={createPatientTestimonial}
        doctorOptions={doctors}
        hospitalOptions={hospitals}
        treatmentOptions={treatments}
      />
    </div>
  )
}
