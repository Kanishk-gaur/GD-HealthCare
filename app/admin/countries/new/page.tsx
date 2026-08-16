import { CountryForm } from '@/app/admin/countries/CountryForm'
import { createCountry } from '@/app/actions/countries'

export default function NewCountryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add country</h1>
      <CountryForm action={createCountry} />
    </div>
  )
}
