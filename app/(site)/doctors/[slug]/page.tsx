import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { connectToDatabase } from '@/lib/mongodb'
import DoctorModel, { type IDoctor } from '@/lib/models/Doctor'
import { DoctorDetailClient } from './DoctorDetailClient'

export const revalidate = 0

export async function generateStaticParams() {
  await connectToDatabase()
  const doctors = await DoctorModel.find().select('slug').lean<{ slug: string }[]>()
  return doctors.map((doctor) => ({
    slug: doctor.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  await connectToDatabase()
  const doctor = await DoctorModel.findOne({ slug: resolvedParams.slug }).lean<IDoctor>()
  return {
    title: `${doctor?.name} | ${doctor?.specialization} Expert`,
    description: doctor?.description,
  }
}

export default async function DoctorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  await connectToDatabase()
  const doctor = await DoctorModel.findOne({ slug: resolvedParams.slug }).lean<IDoctor>()

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Doctor Profile Not Found</h1>
          <Link href="/doctors" className="text-[#ff4c88] hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back to Medical Staff
          </Link>
        </div>
      </div>
    )
  }

  // Profile URL context generation
  const profileUrl = `https://www.gdhealthcare.com/doctors/${doctor.slug}`
  const serialized = JSON.parse(JSON.stringify(doctor))

  return <DoctorDetailClient doctor={serialized} profileUrl={profileUrl} />
}
