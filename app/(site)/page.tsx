import { connectToDatabase } from '@/lib/mongodb'
import Hospital from '@/lib/models/Hospital'
import Doctor from '@/lib/models/Doctor'
import PatientTestimonial from '@/lib/models/PatientTestimonial'
import CostComparison from '@/lib/models/CostComparison'
import MedicalPackage from '@/lib/models/MedicalPackage'
import FAQ from '@/lib/models/FAQ'
import { HomeClient } from './HomeClient'

export const revalidate = 0

export default async function Home() {
  await connectToDatabase()

  const [hospitals, doctors, patientTestimonials, costComparisons, medicalPackages, faqs] =
    await Promise.all([
      Hospital.find().sort({ rating: -1 }).limit(3).lean(),
      Doctor.find().sort({ rating: -1 }).limit(3).lean(),
      PatientTestimonial.find({ published: true }).sort({ date: -1 }).limit(3).lean(),
      CostComparison.find().sort({ name: 1 }).lean(),
      MedicalPackage.find().sort({ hospital: 1, procedure: 1 }).lean(),
      FAQ.find().sort({ order: 1 }).limit(5).lean(),
    ])

  return (
    <HomeClient
      hospitals={JSON.parse(JSON.stringify(hospitals))}
      doctors={JSON.parse(JSON.stringify(doctors))}
      patientTestimonials={JSON.parse(JSON.stringify(patientTestimonials))}
      costComparisons={JSON.parse(JSON.stringify(costComparisons))}
      medicalPackages={JSON.parse(JSON.stringify(medicalPackages))}
      faqs={JSON.parse(JSON.stringify(faqs))}
    />
  )
}
