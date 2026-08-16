'use client'

import Link from 'next/link'
import { Users, Globe } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import type { ICountry } from '@/lib/models/Country'

// Static per-region header copy — the countries within each region are
// admin-managed (see /admin/countries); an admin typing a new region name
// simply forms a new section, falling back to a generic globe/description.
const REGION_META: Record<string, { icon: string; description: string }> = {
  'CIS Countries': {
    icon: '🇷🇺',
    description: 'Patients from Russia, Ukraine, Kazakhstan, and other CIS nations',
  },
  'Pacific Region': {
    icon: '🇦🇺',
    description: 'Patients from Australia, New Zealand, and Pacific Island nations',
  },
  'Middle East': {
    icon: '🇦🇪',
    description: 'Patients from GCC countries and Middle Eastern nations',
  },
  Africa: {
    icon: '🇿🇦',
    description: 'Patients from East, West, and Southern African nations',
  },
  Europe: {
    icon: '🇪🇺',
    description: 'Patients from EU countries, UK, and other European nations',
  },
}

function getRegionMeta(region: string) {
  return REGION_META[region] ?? { icon: '🌍', description: `Patients from ${region}` }
}

function groupByRegion(countries: ICountry[]) {
  const groups = new Map<string, ICountry[]>()
  for (const country of countries) {
    const list = groups.get(country.region)
    if (list) {
      list.push(country)
    } else {
      groups.set(country.region, [country])
    }
  }
  return Array.from(groups.entries()).map(([region, list]) => ({ region, countries: list }))
}

export function CountriesClient({ countries }: { countries: ICountry[] }) {
  const { translate } = useTranslation()

  const regions = groupByRegion(countries)
  const totalPatients = countries.reduce((sum, country) => sum + country.patients, 0)

  return (
    <div className="w-full">
      {/* Header - Updated Gradient */}
      <section className="relative bg-gradient-to-br from-[#ffa649]/10 via-white to-[#ff4c88]/10 py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-[#ffa649]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-[#ff4c88]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-10 w-10 text-[#ffa649]" />
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                {translate('International Patient Services')}
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {translate('Welcoming patients from around the world to experience world-class healthcare in India.')}{' '}
            {translate('We serve patients from CIS countries, Pacific Region, Middle East, Africa, and Europe.')}
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <div>
              <span className="text-3xl font-bold text-[#ffa649]">{totalPatients.toLocaleString()}+</span>
              <span className="text-muted-foreground ml-2">{translate('Patients Served')}</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-[#ff4c88]">{countries.length}</span>
              <span className="text-muted-foreground ml-2">{translate('Countries')}</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-[#ffa649]">{regions.length}</span>
              <span className="text-muted-foreground ml-2">{translate('Global Regions')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Overview - Updated */}
      <section className="py-16 bg-gradient-to-b from-white to-[#ffa649]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('Where Our Patients Come From')}
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {translate('We provide comprehensive healthcare services to patients from various regions across the globe')}
          </p>

          <div className="space-y-16">
            {regions.map(({ region, countries: regionCountries }) => {
              const meta = getRegionMeta(region)
              return (
                <div
                  key={region}
                  className="bg-card rounded-xl border border-[#ffa649]/10 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Region Header */}
                  <div className="bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 px-6 py-5 border-b border-[#ffa649]/10">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{meta.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                          {translate(region)}
                        </h3>
                        <p className="text-muted-foreground text-sm">{translate(meta.description)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Countries Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {regionCountries.map((country) => (
                        <div
                          key={country._id}
                          className="bg-background rounded-lg p-4 border border-[#ffa649]/10 hover:border-[#ffa649] transition-all duration-300 hover:shadow-md hover:shadow-[#ffa649]/5"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{country.flag}</span>
                            <span className="font-semibold hover:text-[#ff4c88] transition-colors">
                              {translate(country.name)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <Users size={14} className="text-[#ffa649]" />
                            <span>
                              {country.patients.toLocaleString()} {translate('patients')}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {country.popularTreatments.slice(0, 2).map((spec) => (
                              <span
                                key={spec}
                                className="text-xs bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 text-[#ff4c88] px-2 py-0.5 rounded font-medium"
                              >
                                {translate(spec)}
                              </span>
                            ))}
                            {country.popularTreatments.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{country.popularTreatments.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Updated */}
      <section className="py-16 bg-gradient-to-br from-[#ffa649]/5 via-white to-[#ff4c88]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('Why International Patients Choose India')}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Cost-Effective Treatment',
                description: 'Save up to 80% on medical procedures compared to Western countries',
                icon: '💰',
              },
              {
                title: 'World-Class Facilities',
                description: 'JCI accredited hospitals with cutting-edge medical technology',
                icon: '🏥',
              },
              {
                title: 'Expert Medical Professionals',
                description: 'Highly qualified doctors trained at top international institutions',
                icon: '👨‍⚕️',
              },
              {
                title: 'Visa Assistance',
                description: 'Hassle-free visa processing for medical travel to India',
                icon: '🛂',
              },
              {
                title: 'Language Support',
                description: 'Multilingual staff including Arabic, Russian, English, and more',
                icon: '🗣️',
              },
              {
                title: 'Comprehensive Care',
                description: 'From initial consultation to post-treatment follow-up',
                icon: '💙',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-card rounded-lg shadow-sm border border-[#ffa649]/10 hover:border-[#ffa649] transition-all duration-300 hover:shadow-md hover:shadow-[#ff4c88]/10">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 hover:text-[#ff4c88] transition-colors">{translate(item.title)}</h3>
                <p className="text-muted-foreground text-sm">{translate(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Updated Gradient */}
      <section className="py-16 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{translate('Ready to Begin Your Medical Journey?')}</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
            {translate('Contact us today for a free consultation and personalized treatment plan')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-white text-[#ff4c88] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
              {translate('Contact Us')}
            </Link>
            <Link href="/treatments" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300">
              {translate('Explore Treatments')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
