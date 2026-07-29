import { connectToDatabase } from '@/lib/mongodb'
import Doctor from '@/lib/models/Doctor'
import { DoctorsClient } from './DoctorsClient'

export const revalidate = 0

export default async function DoctorsPage() {
  await connectToDatabase()
  const doctors = await Doctor.find().sort({ name: 1 }).lean()
  const serialized = JSON.parse(JSON.stringify(doctors))

  return <DoctorsClient doctors={serialized} />
}
