import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import HospitalModel, { type IHospital } from '@/lib/models/Hospital'
import { HospitalDetailClient } from './HospitalDetailClient'

// Public content changes whenever the admin edits it — don't cache a stale
// build-time snapshot.
export const revalidate = 0

export async function generateStaticParams() {
  await connectToDatabase()
  const hospitals = await HospitalModel.find().select('slug').lean<{ slug: string }[]>()
  return hospitals.map((hospital) => ({
    slug: hospital.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  await connectToDatabase()
  const hospital = await HospitalModel.findOne({ slug: resolvedParams.slug }).lean<IHospital>()
  return {
    title: `${hospital?.name} | GD Healthcare`,
    description: hospital?.description,
  }
}

export default async function HospitalDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  await connectToDatabase()
  const hospital = await HospitalModel.findOne({ slug: resolvedParams.slug }).lean<IHospital>()

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Hospital Not Found</h1>
          <Link href="/hospitals" className="text-[#ff4c88] hover:underline">
            Back to Hospitals
          </Link>
        </div>
      </div>
    )
  }

  // Mongoose lean() docs contain ObjectId/Date instances, which aren't
  // serializable across the Server -> Client component boundary as-is.
  const serialized = JSON.parse(JSON.stringify(hospital))

  return <HospitalDetailClient hospital={serialized} />
}
