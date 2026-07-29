import { connectToDatabase } from '@/lib/mongodb'
import Hospital from '@/lib/models/Hospital'
import Doctor from '@/lib/models/Doctor'
import Testimonial from '@/lib/models/Testimonial'
import { HomeClient } from './HomeClient'

export const revalidate = 0

export default async function Home() {
  await connectToDatabase()

  const [hospitals, doctors, testimonials] = await Promise.all([
    Hospital.find().sort({ rating: -1 }).limit(3).lean(),
    Doctor.find().sort({ rating: -1 }).limit(3).lean(),
    Testimonial.find().limit(3).lean(),
  ])

  return (
    <HomeClient
      hospitals={JSON.parse(JSON.stringify(hospitals))}
      doctors={JSON.parse(JSON.stringify(doctors))}
      testimonials={JSON.parse(JSON.stringify(testimonials))}
    />
  )
}
