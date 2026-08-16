import { connectToDatabase } from '@/lib/mongodb'
import Country, { type ICountry } from '@/lib/models/Country'
import { CountriesClient } from './CountriesClient'

export const metadata = {
  title: 'International Patient Services | GD Healthcare',
  description: 'Serving patients from CIS countries, Pacific Region, Middle East, Africa, and Europe with world-class healthcare in India.',
}

// Public content changes whenever the admin edits it — don't cache a stale
// build-time snapshot.
export const revalidate = 0

export default async function InternationalPatientsPage() {
  await connectToDatabase()
  const countries = await Country.find().sort({ order: 1 }).lean<ICountry[]>()
  const serialized = JSON.parse(JSON.stringify(countries))

  return <CountriesClient countries={serialized} />
}
