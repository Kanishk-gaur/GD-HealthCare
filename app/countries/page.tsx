import Image from 'next/image'
import Link from 'next/link'
import { Plane, MapPin, FileText, DollarSign } from 'lucide-react'
import { countries } from '@/lib/data'

export const metadata = {
  title: 'Medical Tourism Destinations | GD Healthcare',
  description: 'Explore top medical tourism destinations with world-class healthcare facilities and cost-effective treatments.',
}

export default function CountriesPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Medical Tourism Destinations</h1>
          <p className="text-lg text-muted-foreground">
            Explore our partner countries offering world-class healthcare at affordable costs
          </p>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country) => (
              <Link
                key={country.id}
                href={`/countries/${country.slug}`}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-border hover:border-primary group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={country.image}
                    alt={country.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{country.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{country.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-foreground">{country.hospitals}</span>
                      <span className="text-muted-foreground">Partner Hospitals</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={18} className="text-primary" />
                      <span className="text-muted-foreground">{country.avgCost}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText size={18} className="text-primary" />
                      <span className="text-muted-foreground">Visa: {country.visaDays} days</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {country.specialities.slice(0, 3).map((spec, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Medical Tourism?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Cost Savings',
                description: 'Save 50-80% on healthcare costs compared to Western countries',
                icon: '💰',
              },
              {
                title: 'Expert Doctors',
                description: 'Access to internationally trained surgeons and specialists',
                icon: '👨‍⚕️',
              },
              {
                title: 'Modern Facilities',
                description: 'World-class hospitals with latest medical technology',
                icon: '🏥',
              },
              {
                title: 'Quick Processing',
                description: 'Fast visa approvals and quick appointment scheduling',
                icon: '⚡',
              },
              {
                title: 'Tourism + Treatment',
                description: 'Combine your medical treatment with vacation',
                icon: '✈️',
              },
              {
                title: '24/7 Support',
                description: 'Comprehensive patient support and coordination services',
                icon: '📞',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
