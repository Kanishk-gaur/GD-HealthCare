import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import TreatmentModel, { type ITreatment } from '@/lib/models/Treatment'
import Hospital, { type IHospital } from '@/lib/models/Hospital'
import Doctor, { type IDoctor } from '@/lib/models/Doctor'
import { TreatmentDetailClient } from './TreatmentDetailClient'

export const revalidate = 0

export async function generateStaticParams() {
  await connectToDatabase()
  const treatments = await TreatmentModel.find().select('slug').lean<{ slug: string }[]>()
  return treatments.map((treatment) => ({
    slug: treatment.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectToDatabase()
  const treatment = await TreatmentModel.findOne({ slug }).lean<ITreatment>()
  return {
    title: `${treatment?.name} | GD Healthcare`,
    description: `Learn about ${treatment?.name} - cost, procedure, success rate, and top hospitals offering this treatment.`,
  }
}

export default async function TreatmentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectToDatabase()
  const treatment = await TreatmentModel.findOne({ slug }).lean<ITreatment>()

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Treatment Not Found</h1>
          <Link href="/treatments" className="text-primary hover:underline">
            Back to Treatments
          </Link>
        </div>
      </div>
    )
  }

  // Slug-based matching — reliable regardless of how a hospital/doctor's
  // display name is edited later in the admin panel.
  const [relatedHospitals, relatedDoctors] = await Promise.all([
    Hospital.find({ slug: { $in: treatment.recommendedHospitalSlugs } }).lean<IHospital[]>(),
    Doctor.find({ slug: { $in: treatment.recommendedDoctorSlugs } }).lean<IDoctor[]>(),
  ])

  return (
    <TreatmentDetailClient
      treatment={JSON.parse(JSON.stringify(treatment))}
      relatedHospitals={JSON.parse(JSON.stringify(relatedHospitals))}
      relatedDoctors={JSON.parse(JSON.stringify(relatedDoctors))}
    />
  )
}
