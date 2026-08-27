'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Bed, Phone, Mail, Globe, Building2, CheckCircle2, ShieldCheck, Stethoscope, ArrowLeft } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import type { IHospital } from '@/lib/models/Hospital'

type SerializedHospital = Omit<IHospital, '_id' | 'createdAt' | 'updatedAt'> & { _id: string }

const CORE_FACILITIES = [
  'Advanced Operating Theatres',
  'ICU & Critical Care Units',
  '24/7 Emergency Medical Response',
  'High-End Robotic Imaging Suites',
  'Full Spectrum Laboratory Pathology',
  'In-House Specialized Pharmacy Support',
  'Comprehensive Post-Op Rehabilitation Wings',
  'International Patient Guest Houses',
]

export function HospitalDetailClient({ hospital }: { hospital: SerializedHospital }) {
  const { translate } = useTranslation()

  return (
    <div className="w-full bg-background">
      {/* Top Breadcrumb Navigation */}
      <div className="bg-background border-b border-[#ffa649]/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/hospitals" className="text-sm text-muted-foreground hover:text-[#ff4c88] inline-flex items-center gap-1.5 transition-colors">
            <ArrowLeft size={14} /> {translate('Back to Hospitals Directory')}
          </Link>
        </div>
      </div>

      {/* Profile Header — the photo sits in a contained box at its native
          2752×1536 ratio (scaled down, never cropped) instead of stretching
          full-bleed across the page. */}
      <div className="bg-background border-b border-[#ffa649]/10 pt-8 pb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="relative w-full lg:w-[420px] aspect-2752/1536 rounded-2xl overflow-hidden border border-[#ffa649]/20 shadow-md bg-muted flex-shrink-0">
              <Image
                src={hospital.image}
                alt={`${translate(hospital.name)} ${translate('Cover Image')}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>

            <div className="flex-1 space-y-4">
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">{translate(hospital.name)}</h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-[#ffa649]" />
                  <span className="text-sm font-medium">{translate(hospital.city || hospital.country)}, {translate(hospital.country)}</span>
                </div>
                <div className="h-4 w-[1px] bg-border hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <Bed size={16} className="text-emerald-500" />
                  <span className="text-sm">{hospital.beds} {translate('Premium Hospital Beds')}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-3 bg-[#ffa649]/5 px-4 py-2 rounded-xl border border-[#ffa649]/20">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <div>
                  <p className="text-lg font-bold text-foreground leading-none">{hospital.rating} / 5.0</p>
                  <p className="text-xs text-muted-foreground mt-1">({hospital.reviews} {translate('verified reviews')})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content Blog Feed Column */}
          <div className="lg:col-span-2 space-y-12">

            {/* Extended Hospital Description (500-800 words) */}
            <section className="bg-card border border-[#ffa649]/10 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-foreground border-b border-[#ffa649]/10 pb-3">
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  {translate('Hospital Overview & Profile')}
                </span>
              </h2>
              <div className="text-muted-foreground leading-relaxed text-base whitespace-pre-line space-y-4">
                {translate(hospital.blogDescription || hospital.description)}
              </div>
            </section>

            {/* Centres of Excellence */}
            {hospital.centresOfExcellence && hospital.centresOfExcellence.length > 0 && (
              <section className="bg-card border border-[#ffa649]/10 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <Building2 className="text-[#ffa649]" size={24} />
                  <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                    {translate('Centres of Excellence')}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hospital.centresOfExcellence.map((centre, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#ffa649]/5 border border-[#ffa649]/20 rounded-xl">
                      <ShieldCheck className="text-[#ffa649] mt-0.5 flex-shrink-0" size={18} />
                      <span className="font-semibold text-foreground text-sm md:text-base">{translate(centre)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Treatments Offered */}
            {hospital.treatmentsOffered && hospital.treatmentsOffered.length > 0 && (
              <section className="bg-card border border-[#ffa649]/10 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <Stethoscope className="text-[#ffa649]" size={24} />
                  <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                    {translate('Advanced Treatments Offered')}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hospital.treatmentsOffered.map((treatment, idx) => (
                    <li key={idx} className="flex items-center gap-3 bg-[#ffa649]/5 border border-[#ffa649]/20 p-3 rounded-lg list-none">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground text-sm font-medium">{translate(treatment)}</span>
                    </li>
                  ))}
                </div>
              </section>
            )}

            {/* Core Facilities List */}
            <section className="bg-card border border-[#ffa649]/10 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  {translate('World-Class Infrastructure Facilities')}
                </span>
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CORE_FACILITIES.map((facility, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="text-[#ff4c88] flex-shrink-0" size={18} />
                    <span className="text-sm">{translate(facility)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Dynamic Sidebar with Quick Specs */}
          <div className="space-y-6">

            {/* Vital Hospital Summary Block */}
            <div className="bg-card border border-[#ffa649]/10 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-[#ffa649]/10 text-foreground">
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  {translate('Hospital Summary Matrix')}
                </span>
              </h3>

              <div className="space-y-5">
                {/* Website Link Block */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{translate('Official Digital Portal')}</p>
                  <a
                    href={hospital.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-[#ff4c88] font-semibold hover:underline break-all"
                  >
                    <Globe size={16} />
                    {hospital.websiteUrl ? hospital.websiteUrl.replace('https://', '') : translate('Visit Site')}
                  </a>
                </div>

                {/* City & Address Block */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{translate('Location Details')}</p>
                  <p className="text-sm font-semibold text-foreground">{translate(hospital.city || hospital.country)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {hospital.address ? translate(hospital.address) : `${translate('Main Campus')}, ${translate(hospital.country)}`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#ffa649]/5 border border-[#ffa649]/20 rounded-xl p-3 text-center">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{translate('ICU Infrastructure')}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${hospital.icuAvailability ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {hospital.icuAvailability ? translate('Active & Available') : translate('On-Demand')}
                    </span>
                  </div>
                  <div className="bg-[#ffa649]/5 border border-[#ffa649]/20 rounded-xl p-3 text-center">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{translate('Beds Vol.')}</p>
                    <p className="text-sm font-bold text-foreground">{hospital.beds} {translate('Units')}</p>
                  </div>
                </div>

                {/* Accreditations & Certifications */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{translate('Accreditation Seals')}</p>
                  <div className="flex flex-wrap gap-2">
                    {hospital.accreditations.map((accred, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-bold bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 text-[#ff4c88] px-3 py-1 rounded-md border border-[#ffa649]/20"
                      >
                        {translate(accred)} {translate('Verified')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Clinical Medical Departments */}
                {hospital.departments && hospital.departments.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{translate('Active Departments')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {hospital.departments.map((dept, idx) => (
                        <span key={idx} className="text-[11px] font-medium bg-[#ffa649]/5 text-muted-foreground px-2 py-1 rounded border border-[#ffa649]/10">
                          {translate(dept)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* International Patient Services */}
                {hospital.intlServices && hospital.intlServices.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{translate('International Patient Desk')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {hospital.intlServices.map((service, idx) => (
                        <span key={idx} className="text-[11px] font-medium bg-blue-50 text-[#ff4c88] px-2 py-1 rounded border border-[#ffa649]/20">
                          ✓ {translate(service)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Functional Interactive Consult buttons */}
              <div className="mt-6 space-y-2">
                <Link
                  href="/contact"
                  className="block text-center w-full px-4 py-2.5 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#ff4c88]/30 transition-all duration-300 text-sm"
                >
                  {translate('Schedule Consultation')}
                </Link>
                <a
                  href="https://wa.me/919711614738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-2.5 border border-[#ff4c88]/40 text-[#ff4c88] bg-[#ff4c88]/5 rounded-xl font-semibold hover:bg-[#ff4c88]/10 transition-colors text-sm"
                >
                  {translate('Chat on WhatsApp')}
                </a>
              </div>
            </div>

            {/* Generic Secondary Contact Information Panel */}
            <div className="bg-card border border-[#ffa649]/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-foreground">
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  {translate('Inquiries Desk')}
                </span>
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#ffa649] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{translate('International Hotline')}</p>
                    <a href="tel:+919711614738" className="font-semibold text-[#ff4c88] hover:underline">
                      +91 9711 614 738
                    </a>
                    <br />
                    <a href="tel:+919821760900" className="font-semibold text-[#ff4c88] hover:underline">
                      +91 9821 760 900
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#ffa649] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">{translate('Support Correspondence')}</p>
                    <a href="mailto:info@gdhealthcare.in" className="font-semibold text-[#ff4c88] hover:underline">
                      info@gdhealthcare.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
