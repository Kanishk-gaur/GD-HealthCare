import Image from 'next/image'
import Link from 'next/link'
import { Plane, MapPin, FileText, DollarSign, Users, Globe } from 'lucide-react'

export const metadata = {
  title: 'International Patient Services | GD Healthcare',
  description: 'Serving patients from CIS countries, Pacific Region, Middle East, Africa, and Europe with world-class healthcare in India.',
}

// Region-based patient country data
const regions = [
  {
    id: 'cis',
    name: 'CIS Countries',
    description: 'Patients from Russia, Ukraine, Kazakhstan, and other CIS nations',
    icon: '🇷🇺',
    countries: [
      { name: 'Russia', flag: '🇷🇺', patients: 1250, popular: ['Cardiology', 'Oncology'] },
      { name: 'Ukraine', flag: '🇺🇦', patients: 850, popular: ['Orthopedics', 'Neurology'] },
      { name: 'Kazakhstan', flag: '🇰🇿', patients: 720, popular: ['Cardiology', 'Nephrology'] },
      { name: 'Uzbekistan', flag: '🇺🇿', patients: 580, popular: ['Gynecology', 'Urology'] },
      { name: 'Azerbaijan', flag: '🇦🇿', patients: 420, popular: ['Ophthalmology', 'Dental'] },
    ]
  },
  {
    id: 'pacific',
    name: 'Pacific Region',
    description: 'Patients from Australia, New Zealand, and Pacific Island nations',
    icon: '🇦🇺',
    countries: [
      { name: 'Australia', flag: '🇦🇺', patients: 980, popular: ['Cosmetic Surgery', 'Dental'] },
      { name: 'New Zealand', flag: '🇳🇿', patients: 650, popular: ['Orthopedics', 'Cardiology'] },
      { name: 'Fiji', flag: '🇫🇯', patients: 180, popular: ['General Surgery', 'Gynecology'] },
      { name: 'Papua New Guinea', flag: '🇵🇬', patients: 120, popular: ['Cardiology', 'Pediatrics'] },
    ]
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    description: 'Patients from GCC countries and Middle Eastern nations',
    icon: '🇦🇪',
    countries: [
      { name: 'UAE', flag: '🇦🇪', patients: 2100, popular: ['Cardiology', 'Oncology', 'Orthopedics'] },
      { name: 'Saudi Arabia', flag: '🇸🇦', patients: 1850, popular: ['Cardiology', 'Neurology'] },
      { name: 'Kuwait', flag: '🇰🇼', patients: 1200, popular: ['Oncology', 'Nephrology'] },
      { name: 'Qatar', flag: '🇶🇦', patients: 980, popular: ['Orthopedics', 'Ophthalmology'] },
      { name: 'Oman', flag: '🇴🇲', patients: 750, popular: ['Cardiology', 'Gynecology'] },
      { name: 'Bahrain', flag: '🇧🇭', patients: 520, popular: ['Dental', 'Cosmetic Surgery'] },
    ]
  },
  {
    id: 'africa',
    name: 'Africa',
    description: 'Patients from East, West, and Southern African nations',
    icon: '🇿🇦',
    countries: [
      { name: 'Kenya', flag: '🇰🇪', patients: 680, popular: ['Cardiology', 'Oncology'] },
      { name: 'Nigeria', flag: '🇳🇬', patients: 920, popular: ['Orthopedics', 'Neurology'] },
      { name: 'South Africa', flag: '🇿🇦', patients: 550, popular: ['Cardiology', 'Cosmetic Surgery'] },
      { name: 'Ethiopia', flag: '🇪🇹', patients: 380, popular: ['Gynecology', 'Pediatrics'] },
      { name: 'Ghana', flag: '🇬🇭', patients: 310, popular: ['General Surgery', 'Urology'] },
      { name: 'Tanzania', flag: '🇹🇿', patients: 250, popular: ['Cardiology', 'Ophthalmology'] },
    ]
  },
  {
    id: 'europe',
    name: 'Europe',
    description: 'Patients from EU countries, UK, and other European nations',
    icon: '🇪🇺',
    countries: [
      { name: 'United Kingdom', flag: '🇬🇧', patients: 1600, popular: ['Cosmetic Surgery', 'Dental', 'Orthopedics'] },
      { name: 'Germany', flag: '🇩🇪', patients: 850, popular: ['Cardiology', 'Oncology'] },
      { name: 'France', flag: '🇫🇷', patients: 720, popular: ['Orthopedics', 'Neurology'] },
      { name: 'Italy', flag: '🇮🇹', patients: 580, popular: ['Cosmetic Surgery', 'Dental'] },
      { name: 'Spain', flag: '🇪🇸', patients: 490, popular: ['Cardiology', 'Ophthalmology'] },
      { name: 'Netherlands', flag: '🇳🇱', patients: 420, popular: ['Orthopedics', 'Gynecology'] },
      { name: 'Sweden', flag: '🇸🇪', patients: 380, popular: ['Neurology', 'Cardiology'] },
    ]
  }
]

export default function InternationalPatientsPage() {
  // Calculate total patients
  const totalPatients = regions.reduce((acc, region) => 
    acc + region.countries.reduce((sum, country) => sum + country.patients, 0), 0
  )

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
                International Patient Services
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Welcoming patients from around the world to experience world-class healthcare in India. 
            We serve patients from CIS countries, Pacific Region, Middle East, Africa, and Europe.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <div>
              <span className="text-3xl font-bold text-[#ffa649]">{totalPatients.toLocaleString()}+</span>
              <span className="text-muted-foreground ml-2">Patients Served</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-[#ff4c88]">40+</span>
              <span className="text-muted-foreground ml-2">Countries</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-[#ffa649]">5</span>
              <span className="text-muted-foreground ml-2">Global Regions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Overview - Updated */}
      <section className="py-16 bg-gradient-to-b from-white to-[#ffa649]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              Where Our Patients Come From
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We provide comprehensive healthcare services to patients from various regions across the globe
          </p>

          <div className="space-y-16">
            {regions.map((region) => (
              <div key={region.id} className="bg-card rounded-xl border border-[#ffa649]/10 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Region Header */}
                <div className="bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 px-6 py-5 border-b border-[#ffa649]/10">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{region.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                        {region.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">{region.description}</p>
                    </div>
                  </div>
                </div>

                {/* Countries Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {region.countries.map((country, idx) => (
                      <div key={idx} className="bg-background rounded-lg p-4 border border-[#ffa649]/10 hover:border-[#ffa649] transition-all duration-300 hover:shadow-md hover:shadow-[#ffa649]/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{country.flag}</span>
                          <span className="font-semibold hover:text-[#ff4c88] transition-colors">{country.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <Users size={14} className="text-[#ffa649]" />
                          <span>{country.patients.toLocaleString()} patients</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {country.popular.slice(0, 2).map((spec, i) => (
                            <span key={i} className="text-xs bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 text-[#ff4c88] px-2 py-0.5 rounded font-medium">
                              {spec}
                            </span>
                          ))}
                          {country.popular.length > 2 && (
                            <span className="text-xs text-muted-foreground">+{country.popular.length - 2}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Updated */}
      <section className="py-16 bg-gradient-to-br from-[#ffa649]/5 via-white to-[#ff4c88]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              Why International Patients Choose India
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
                <h3 className="font-bold text-lg mb-2 hover:text-[#ff4c88] transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Updated Gradient */}
      <section className="py-16 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Medical Journey?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
            Contact us today for a free consultation and personalized treatment plan
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-white text-[#ff4c88] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
              Contact Us
            </Link>
            <Link href="/treatments" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300">
              Explore Treatments
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}