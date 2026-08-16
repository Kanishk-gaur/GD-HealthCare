import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import Country, { type ICountry } from '@/lib/models/Country'
import { CountryForm } from '@/app/admin/countries/CountryForm'
import { updateCountry } from '@/app/actions/countries'

export const dynamic = 'force-dynamic'

export default async function EditCountryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const country = await Country.findById(id).lean<ICountry>()

  if (!country) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit {country.name}</h1>
      <CountryForm action={updateCountry.bind(null, id)} country={country} />
    </div>
  )
}
