'use client';

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Stethoscope, DollarSign, Clock, TrendingUp, CheckCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { HeroTextBackdrop } from '@/components/HeroTextBackdrop'
import CostComparison from '@/components/CostComparison'
import MedicalCostComparison from '@/components/MedicalCostComparison'
import { PatientTestimonialCard } from '@/components/PatientTestimonialCard'
import type { IHospital } from '@/lib/models/Hospital'
import type { IDoctor } from '@/lib/models/Doctor'
import type { IPatientTestimonial } from '@/lib/models/PatientTestimonial'
import type { ICostComparison } from '@/lib/models/CostComparison'
import type { IMedicalPackage } from '@/lib/models/MedicalPackage'
import type { IFAQ } from '@/lib/models/FAQ'

type Serialized<T> = Omit<T, '_id' | 'createdAt' | 'updatedAt'> & { _id: string }

const stats = [
  { label: '5000+', description: 'Successful Surgeries', icon: '✓' },
  { label: '50K+', description: 'Happy Patients', icon: '😊' },
  { label: '80%', description: 'Cost Savings', icon: '💰' },
  { label: '200+', description: 'Expert Doctors', icon: '👨‍⚕️' },
]

export const costData: {
  name: string
  usaCost: number
  indiaCost: number
  category?: string
}[] = [
  { name: 'Heart Bypass Surgery', usaCost: 120000, indiaCost: 4700 },
  { name: 'Knee Replacement', usaCost: 35000, indiaCost: 6800 },
  { name: 'Brain Tumor Surgery', usaCost: 150000, indiaCost: 6500 },
  { name: 'Dental Implants', usaCost: 6000, indiaCost: 800 },
  { name: 'Hip Replacement', usaCost: 40000, indiaCost: 8500 },
  { name: 'Spinal Fusion Surgery', usaCost: 110000, indiaCost: 5000 },
  { name: 'Liver Transplant', usaCost: 550000, indiaCost: 20000 },
  { name: 'Kidney Transplant', usaCost: 300000, indiaCost: 12500 },
  { name: 'Bone Marrow Transplant', usaCost: 450000, indiaCost: 16000 },
  { name: 'Coronary Angioplasty', usaCost: 45000, indiaCost: 3500 },
  { name: 'Heart Valve Replacement', usaCost: 170000, indiaCost: 6500 },
  { name: 'Cataract Surgery', usaCost: 5000, indiaCost: 900 },
  { name: 'LASIK Eye Surgery', usaCost: 4500, indiaCost: 1000 },
  { name: 'IVF Treatment', usaCost: 18000, indiaCost: 4000 },
  { name: 'Appendix Removal', usaCost: 18000, indiaCost: 3500 },
  { name: 'Gallbladder Removal', usaCost: 22000, indiaCost: 2800 },
  { name: 'Hernia Repair', usaCost: 16000, indiaCost: 3000 },
  { name: 'Prostate Surgery', usaCost: 45000, indiaCost: 3500 },
  { name: 'Hysterectomy', usaCost: 25000, indiaCost: 5000 },
  { name: 'Cochlear Implant', usaCost: 70000, indiaCost: 15000 },
  { name: 'Lung Transplant', usaCost: 900000, indiaCost: 55000 },
  { name: 'Heart Transplant', usaCost: 1400000, indiaCost: 45000 },
  { name: 'ACL Reconstruction', usaCost: 35000, indiaCost: 6000 },
  { name: 'Shoulder Replacement', usaCost: 40000, indiaCost: 9000 },
  { name: 'Rotator Cuff Repair', usaCost: 25000, indiaCost: 5000 },
  { name: 'Sleeve Gastrectomy', usaCost: 25000, indiaCost: 6000 },
  { name: 'Gastric Bypass Surgery', usaCost: 35000, indiaCost: 5500 },
  { name: 'Rhinoplasty', usaCost: 9000, indiaCost: 2500 },
  { name: 'Breast Reconstruction', usaCost: 20000, indiaCost: 4000 },
  { name: 'Chemotherapy (Per Cycle)', usaCost: 12000, indiaCost: 1200 },
  { name: 'Radiation Therapy (Course)', usaCost: 60000, indiaCost: 3500 },
  { name: 'PET Scan', usaCost: 6000, indiaCost: 400 },
  { name: 'MRI Scan', usaCost: 2500, indiaCost: 150 },
  { name: 'CT Scan', usaCost: 1500, indiaCost: 100 },
  { name: 'Full Body Health Checkup', usaCost: 3000, indiaCost: 250 },
]

const features = [
  {
    icon: Stethoscope,
    title: 'Expert Doctors',
    description: 'Verified and experienced medical professionals with international training',
  },
  {
    icon: CheckCircle,
    title: 'Quality Assurance',
    description: 'JCI and NABH accredited hospitals with latest medical technology',
  },
  {
    icon: DollarSign,
    title: 'Affordable Costs',
    description: 'Save 50-80% compared to Western countries without compromising quality',
  },
  {
    icon: Clock,
    title: 'Quick Processing',
    description: 'From consultation to surgery in just 2-3 weeks',
  },
]

const treatmentCategories = [
  { name: 'Cardiology', icon: '❤️', count: 5, keywords: ['cardiac', 'cardiology'] },
  { name: 'Orthopedics', icon: '🦴', count: 8, keywords: ['orthopaedic', 'orthopedic'] },
  { name: 'Neurosurgery', icon: '🧠', count: 4, keywords: ['neuro'] },
  { name: 'Oncology', icon: '🔬', count: 6, keywords: ['oncology'] },
  { name: 'Dentistry', icon: '😁', count: 12, keywords: ['dental'] },
  { name: 'IVF', icon: '👶', count: 3, keywords: ['reproductive', 'ivf', 'fertility'] },
]

interface HomeClientProps {
  hospitals: Serialized<IHospital>[]
  doctors: Serialized<IDoctor>[]
  patientTestimonials: Serialized<IPatientTestimonial>[]
  costComparisons: Serialized<ICostComparison>[]
  medicalPackages: Serialized<IMedicalPackage>[]
  faqs: Serialized<IFAQ>[]
  treatments: { category: string; thumbnailUrl: string }[]
}

export function HomeClient({
  hospitals,
  doctors,
  patientTestimonials,
  costComparisons,
  medicalPackages,
  faqs,
  treatments,
}: HomeClientProps) {
  const { translate } = useTranslation();

  // First real treatment thumbnail whose DB category matches a home page category's keywords
  const categoryImage = (keywords: string[]): string | undefined =>
    treatments.find((t) => keywords.some((kw) => t.category.toLowerCase().includes(kw)))?.thumbnailUrl

  return (
    <div className="w-full">
      {/* Hero Section - Updated Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/home/gd-home-page.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/50 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffa649]/20 via-transparent to-[#ff4c88]/20 z-0"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#ffa649]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#ff4c88]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <HeroTextBackdrop className="absolute inset-0 -z-10 w-full h-full pointer-events-none" />
              <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ffa649]/20 to-[#ff4c88]/20 text-sm font-medium text-[#ff4c88] mb-6">
                🌟 {translate('Trusted by 50K+ Patients Worldwide')}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  {translate('World-Class Healthcare')}
                </span>
                <br />
                <span>{translate('at Affordable Prices')}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {translate('Access premium medical treatments from top hospitals and surgeons worldwide. Save up to 80% while receiving world-class care.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#consultation"
                  className="px-8 py-3 rounded-lg font-semibold text-center text-white bg-gradient-to-r from-[#ffa649] to-[#ff4c88] hover:shadow-lg hover:shadow-[#ff4c88]/30 transition-all duration-300 transform hover:scale-105"
                >
                  {translate('Schedule Consultation')}
                </a>
                <a
                  href="/treatments"
                  className="px-8 py-3 rounded-lg font-semibold text-center bg-white text-[#ff4c88] border-2 border-[#ff4c88] hover:bg-gradient-to-r hover:from-[#ffa649] hover:to-[#ff4c88] hover:text-white hover:border-transparent transition-all duration-300"
                >
                  {translate('Explore Treatments')}
                </a>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/home/gd-home.jpeg"
                alt={translate('Global medical travel, planned and documented')}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Updated Gradient */}
      <section className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.label}</div>
                <p className="text-white/90">{translate(stat.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Updated Colors */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('Why Choose GD Healthcare?')}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="bg-card rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-[#ffa649] group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ffa649]/20 to-[#ff4c88]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="text-[#ff4c88]" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#ff4c88] transition-colors">{translate(feature.title)}</h3>
                  <p className="text-muted-foreground">{translate(feature.description)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Treatment Categories - Updated Colors */}
      <section className="py-16 bg-gradient-to-br from-[#ffa649]/5 via-white to-[#ff4c88]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('Popular Treatments')}
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {treatmentCategories.map((category, idx) => {
              const image = categoryImage(category.keywords)
              return (
                <Link
                  key={idx}
                  href={`/treatments?category=${category.name}`}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-xl transition-all duration-300 border border-border hover:border-[#ffa649] group"
                >
                  {image ? (
                    <div className="relative w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden ring-2 ring-[#ffa649]/20 group-hover:scale-110 transition-transform">
                      <Image src={image} alt={category.name} fill sizes="48px" className="object-cover" />
                    </div>
                  ) : (
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{category.icon}</div>
                  )}
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-[#ff4c88] transition-colors">{translate(category.name)}</h3>
                  <p className="text-xs text-muted-foreground">{category.count}+ {translate('procedures')}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Hospitals - Updated Colors */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('Our Partner Hospitals')}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospitals.slice(0, 3).map((hospital) => (
              <Link
                key={hospital._id}
                href={`/hospitals/${hospital.slug}`}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-border hover:border-[#ffa649] group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={hospital.image}
                    alt={translate(hospital.name)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-[#ff4c88] transition-colors">{translate(hospital.name)}</h3>
                    <div className="flex items-center gap-1 bg-gradient-to-r from-[#ffa649]/20 to-[#ff4c88]/20 px-2 py-1 rounded">
                      <Star size={16} className="text-[#ffa649] fill-[#ffa649]" />
                      <span className="text-sm font-semibold text-[#ff4c88]">{hospital.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin size={16} />
                    <span className="text-sm">{translate(hospital.country)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{translate(hospital.description)}</p>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specializations.slice(0, 2).map((spec, idx) => (
                      <span key={idx} className="text-xs bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 text-[#ff4c88] px-2 py-1 rounded">
                        {translate(spec)}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/hospitals"
              className="px-8 py-3 rounded-lg font-semibold inline-block bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white hover:shadow-lg hover:shadow-[#ff4c88]/30 transition-all duration-300 transform hover:scale-105"
            >
              {translate('View All Hospitals →')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Doctors - Updated Colors */}
      <section className="py-16 bg-gradient-to-br from-[#ffa649]/5 via-white to-[#ff4c88]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('Meet Our Expert Doctors')}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.slice(0, 3).map((doctor, idx) => (
              <Link
                key={doctor._id}
                href={`/doctors/${doctor.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-border hover:border-[#ffa649] group flex flex-col"
              >
                <div className="relative w-full aspect-[3/4] md:aspect-[2/3] overflow-hidden bg-gradient-to-br from-[#ffa649]/10 to-[#ff4c88]/10">
                  <Image
                    src={doctor.image}
                    alt={translate(doctor.name)}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 3}
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-1 line-clamp-1 group-hover:text-[#ff4c88] transition-colors">{translate(doctor.name)}</h3>
                  <p className="text-[#ffa649] text-sm font-medium mb-2">{translate(doctor.specialization)}</p>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{translate(doctor.hospital)}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-[#ffa649] fill-[#ffa649]" />
                      <span className="text-sm font-semibold">{doctor.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({doctor.reviews} {translate('reviews')})</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{doctor.experience} {translate('years experience')}</p>

                  <div className="mt-auto pt-4 border-t border-border">
                    <div className="text-sm font-semibold bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                      {translate('From')} ${doctor.consultationFee}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/doctors"
              className="px-8 py-3 rounded-lg font-semibold inline-block bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white hover:shadow-lg hover:shadow-[#ff4c88]/30 transition-all duration-300 transform hover:scale-105"
            >
              {translate('View All Doctors →')}
            </Link>
          </div>
        </div>
      </section>

      {/* Cost Comparison - Updated Colors */}
      <CostComparison
        data={costComparisons.map((c) => ({
          id: c._id,
          name: c.name,
          usaCost: c.usaCost,
          indiaCost: c.indiaCost,
          category: c.category,
        }))}
      />
      <MedicalCostComparison
        packages={medicalPackages.map((p) => ({
          id: p._id,
          procedure: p.procedure,
          specialty: p.specialty,
          hospital: p.hospital,
          los: p.los,
          icuDays: p.icuDays,
          wardDays: p.wardDays,
          economyPrice: p.economyPrice,
          doublePrice: p.doublePrice,
          singlePrice: p.singlePrice,
          notes: p.notes,
          includes: p.includes,
        }))}
      />

      {/* Patient Testimonials */}
      <section className="py-16 bg-gradient-to-br from-[#ffa649]/5 via-white to-[#ff4c88]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                {translate('Patient Testimonials')}
              </span>
            </h2>
            <Link
              href="/patient-testimonials"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#ff4c88] hover:underline"
            >
              {translate('View all')}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patientTestimonials.slice(0, 3).map((testimonial) => (
              <PatientTestimonialCard key={testimonial._id} post={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Updated Colors */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('Frequently Asked Questions')}
            </span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq._id} className="bg-card rounded-lg border border-border p-6 hover:border-[#ffa649] transition-all duration-300 cursor-pointer group">
                <summary className="font-semibold flex justify-between items-center group-hover:text-[#ff4c88] transition-colors">
                  {translate(faq.question)}
                  <span className="text-[#ffa649] group-hover:text-[#ff4c88] text-xl">+</span>
                </summary>
                <p className="text-muted-foreground mt-4">{translate(faq.answer)}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="px-8 py-3 rounded-lg font-semibold inline-block bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white hover:shadow-lg hover:shadow-[#ff4c88]/30 transition-all duration-300 transform hover:scale-105"
            >
              {translate('Have More Questions? Contact Us')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated Gradient */}
      <section id="consultation" className="py-20 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{translate('Ready to Transform Your Health?')}</h2>
          <p className="text-lg text-white/90 mb-8">
            {translate('Schedule a free consultation with our medical experts today and start your journey to better health.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919711614738"
              className="px-8 py-3 bg-white text-[#ff4c88] rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {translate('Call Now')}
            </a>
            <a
              href="https://wa.me/919711614738"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              {translate('WhatsApp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}