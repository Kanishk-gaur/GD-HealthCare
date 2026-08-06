import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import PatientTestimonial, { type IPatientTestimonial } from '@/lib/models/PatientTestimonial'
import Doctor, { type IDoctor } from '@/lib/models/Doctor'
import Hospital, { type IHospital } from '@/lib/models/Hospital'
import Treatment, { type ITreatment } from '@/lib/models/Treatment'
import { PatientTestimonialForm } from '@/app/admin/patient-testimonials/PatientTestimonialForm'
import { updatePatientTestimonial } from '@/app/actions/patient-testimonials'

export default async function EditPatientTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const [post, doctors, hospitals, treatments] = await Promise.all([
    PatientTestimonial.findById(id).lean<IPatientTestimonial>(),
    Doctor.find().select('slug name').lean<IDoctor[]>(),
    Hospital.find().select('slug name').lean<IHospital[]>(),
    Treatment.find().select('slug name').lean<ITreatment[]>(),
  ])

  if (!post) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit testimonial</h1>
      <PatientTestimonialForm
        action={updatePatientTestimonial.bind(null, id)}
        post={post}
        doctorOptions={doctors}
        hospitalOptions={hospitals}
        treatmentOptions={treatments}
      />
    </div>
  )
}
