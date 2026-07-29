import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Bed, Award, Phone, Mail, Globe, Building2, CheckCircle2, ShieldCheck, Stethoscope } from 'lucide-react'
import { connectToDatabase } from '@/lib/mongodb'
import HospitalModel, { type IHospital } from '@/lib/models/Hospital'

// Public content changes whenever the admin edits it — don't cache a stale
// build-time snapshot.
export const revalidate = 0

export async function generateStaticParams() {
  await connectToDatabase()
  const hospitals = await HospitalModel.find().select('slug').lean<{ slug: string }[]>()
  return hospitals.map((hospital) => ({
    slug: hospital.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  await connectToDatabase()
  const hospital = await HospitalModel.findOne({ slug: resolvedParams.slug }).lean<IHospital>()
  return {
    title: `${hospital?.name} | GD Healthcare`,
    description: hospital?.description,
  }
}

export default async function HospitalDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  await connectToDatabase()
  const hospital = await HospitalModel.findOne({ slug: resolvedParams.slug }).lean<IHospital>()

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Hospital Not Found</h1>
          <Link href="/hospitals" className="text-[#ff4c88] hover:underline">
            Back to Hospitals
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-background">
      {/* Hero Banner Image */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src={hospital.image}
          alt={`${hospital.name} Cover Image`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Floating Header details on hero banner */}
        <div className="absolute bottom-0 inset-x-0 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Logo URL Display */}
              {hospital.logoUrl && (
                <div className="relative h-20 w-20 rounded-xl bg-white p-1 shadow-lg border border-[#ffa649]/20 flex-shrink-0 overflow-hidden hidden sm:block">
                  <Image 
                    src={hospital.logoUrl} 
                    alt={`${hospital.name} Logo`} 
                    fill 
                    className="object-contain p-1"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">{hospital.name}</h1>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-[#ffa649]" />
                    <span className="text-sm font-medium">{hospital.city || hospital.country}, {hospital.country}</span>
                  </div>
                  <div className="h-4 w-[1px] bg-white/30 hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <Bed size={16} className="text-emerald-400" />
                    <span className="text-sm">{hospital.beds} Premium Hospital Beds</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 self-start md:self-end">
              <Star size={20} className="text-yellow-400 fill-yellow-400" />
              <div>
                <p className="text-lg font-bold text-white leading-none">{hospital.rating} / 5.0</p>
                <p className="text-xs text-white/70 mt-1">({hospital.reviews} verified reviews)</p>
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
                  Hospital Overview & Profile
                </span>
              </h2>
              <div className="text-muted-foreground leading-relaxed text-base whitespace-pre-line space-y-4">
                {hospital.blogDescription || hospital.description}
              </div>
            </section>

            {/* Centres of Excellence */}
            {hospital.centresOfExcellence && hospital.centresOfExcellence.length > 0 && (
              <section className="bg-card border border-[#ffa649]/10 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <Building2 className="text-[#ffa649]" size={24} />
                  <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                    Centres of Excellence
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hospital.centresOfExcellence.map((centre, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#ffa649]/5 border border-[#ffa649]/20 rounded-xl">
                      <ShieldCheck className="text-[#ffa649] mt-0.5 flex-shrink-0" size={18} />
                      <span className="font-semibold text-foreground text-sm md:text-base">{centre}</span>
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
                    Advanced Treatments Offered
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hospital.treatmentsOffered.map((treatment, idx) => (
                    <li key={idx} className="flex items-center gap-3 bg-[#ffa649]/5 border border-[#ffa649]/20 p-3 rounded-lg list-none">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground text-sm font-medium">{treatment}</span>
                    </li>
                  ))}
                </div>
              </section>
            )}

            {/* Core Facilities List */}
            <section className="bg-card border border-[#ffa649]/10 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  World-Class Infrastructure Facilities
                </span>
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Advanced Operating Theatres',
                  'ICU & Critical Care Units',
                  '24/7 Emergency Medical Response',
                  'High-End Robotic Imaging Suites',
                  'Full Spectrum Laboratory Pathology',
                  'In-House Specialized Pharmacy Support',
                  'Comprehensive Post-Op Rehabilitation Wings',
                  'International Patient Guest Houses',
                ].map((facility, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="text-[#ff4c88] flex-shrink-0" size={18} />
                    <span className="text-sm">{facility}</span>
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
                  Hospital Summary Matrix
                </span>
              </h3>
              
              <div className="space-y-5">
                {/* Website Link Block */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Official Digital Portal</p>
                  <a 
                    href={hospital.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 text-sm text-[#ff4c88] font-semibold hover:underline break-all"
                  >
                    <Globe size={16} />
                    {hospital.websiteUrl ? hospital.websiteUrl.replace('https://', '') : 'Visit Site'}
                  </a>
                </div>

                {/* City & Address Block */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Location Details</p>
                  <p className="text-sm font-semibold text-foreground">{hospital.city || hospital.country}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{hospital.address || `Main Campus, ${hospital.country}`}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#ffa649]/5 border border-[#ffa649]/20 rounded-xl p-3 text-center">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">ICU Infrastructure</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${hospital.icuAvailability ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {hospital.icuAvailability ? 'Active & Available' : 'On-Demand'}
                    </span>
                  </div>
                  <div className="bg-[#ffa649]/5 border border-[#ffa649]/20 rounded-xl p-3 text-center">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Beds Vol.</p>
                    <p className="text-sm font-bold text-foreground">{hospital.beds} Units</p>
                  </div>
                </div>

                {/* Accreditations & Certifications */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Accreditation Seals</p>
                  <div className="flex flex-wrap gap-2">
                    {hospital.accreditations.map((accred, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-bold bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 text-[#ff4c88] px-3 py-1 rounded-md border border-[#ffa649]/20"
                      >
                        {accred} Verified
                      </span>
                    ))}
                  </div>
                </div>

                {/* Clinical Medical Departments */}
                {hospital.departments && hospital.departments.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Active Departments</p>
                    <div className="flex flex-wrap gap-1.5">
                      {hospital.departments.map((dept, idx) => (
                        <span key={idx} className="text-[11px] font-medium bg-[#ffa649]/5 text-muted-foreground px-2 py-1 rounded border border-[#ffa649]/10">
                          {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* International Patient Services */}
                {hospital.intlServices && hospital.intlServices.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">International Patient Desk</p>
                    <div className="flex flex-wrap gap-1.5">
                      {hospital.intlServices.map((service, idx) => (
                        <span key={idx} className="text-[11px] font-medium bg-blue-50 text-[#ff4c88] px-2 py-1 rounded border border-[#ffa649]/20">
                          ✓ {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cost Info inside sidebar */}
                <div className="pt-4 border-t border-[#ffa649]/10">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Est. Treatment Range</p>
                  <p className="text-xl font-black bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                    ${hospital.avgCost.min.toLocaleString()} - ${hospital.avgCost.max.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Functional Interactive Consult buttons */}
              <div className="mt-6 space-y-2">
                <button className="w-full px-4 py-2.5 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#ff4c88]/30 transition-all duration-300 text-sm">
                  Schedule Consultation
                </button>
                <a
                  href="https://wa.me/919711614738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-2.5 border border-[#ff4c88]/40 text-[#ff4c88] bg-[#ff4c88]/5 rounded-xl font-semibold hover:bg-[#ff4c88]/10 transition-colors text-sm"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Generic Secondary Contact Information Panel */}
            <div className="bg-card border border-[#ffa649]/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-foreground">
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  Inquiries Desk
                </span>
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#ffa649] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">International Hotline</p>
                    <a href="tel:+919711614738" className="font-semibold text-[#ff4c88] hover:underline">
                      +91 9711 614 738
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#ffa649] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Support Correspondence</p>
                    <a href="mailto:info@gdhealthcare.com" className="font-semibold text-[#ff4c88] hover:underline">
                      info@gdhealthcare.com
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