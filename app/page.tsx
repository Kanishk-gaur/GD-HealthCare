'use client';

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Stethoscope, DollarSign, Clock, TrendingUp, CheckCircle } from 'lucide-react'
import { hospitals, doctors, treatments, testimonials, faqs } from '@/lib/data'
import { useTranslation } from '@/hooks/useTranslation'
import CostComparison from '@/components/CostComparison'
import MedicalCostComparison, { allPackages } from '@/components/MedicalCostComparison'; // ✅ Added import

const stats = [
  { label: '5000+', description: 'Successful Surgeries', icon: '✓' },
  { label: '50K+', description: 'Happy Patients', icon: '😊' },
  { label: '80%', description: 'Cost Savings', icon: '💰' },
  { label: '200+', description: 'Expert Doctors', icon: '👨‍⚕️' },
]

const costData = [
  { name: 'Heart Bypass Surgery', usaCost: 120000, indiaCost: 18000 },
  { name: 'Knee Replacement', usaCost: 35000, indiaCost: 13000 },
  { name: 'Brain Tumor Surgery', usaCost: 150000, indiaCost: 28000 },
  { name: 'Dental Implants', usaCost: 6000, indiaCost: 1200 },
  { name: 'Hip Replacement', usaCost: 40000, indiaCost: 14000 },
  { name: 'Spinal Fusion Surgery', usaCost: 110000, indiaCost: 22000 },
  { name: 'Liver Transplant', usaCost: 550000, indiaCost: 45000 },
  { name: 'Kidney Transplant', usaCost: 300000, indiaCost: 17000 },
  { name: 'Bone Marrow Transplant', usaCost: 450000, indiaCost: 35000 },
  { name: 'Coronary Angioplasty', usaCost: 45000, indiaCost: 7000 },
  { name: 'Heart Valve Replacement', usaCost: 170000, indiaCost: 25000 },
  { name: 'Cataract Surgery', usaCost: 5000, indiaCost: 900 },
  { name: 'LASIK Eye Surgery', usaCost: 4500, indiaCost: 1500 },
  { name: 'IVF Treatment', usaCost: 18000, indiaCost: 4000 },
  { name: 'Appendix Removal', usaCost: 18000, indiaCost: 3500 },
  { name: 'Gallbladder Removal', usaCost: 22000, indiaCost: 4500 },
  { name: 'Hernia Repair', usaCost: 16000, indiaCost: 3000 },
  { name: 'Prostate Surgery', usaCost: 45000, indiaCost: 8000 },
  { name: 'Hysterectomy', usaCost: 25000, indiaCost: 5000 },
  { name: 'Cochlear Implant', usaCost: 70000, indiaCost: 15000 },
  { name: 'Lung Transplant', usaCost: 900000, indiaCost: 60000 },
  { name: 'Heart Transplant', usaCost: 1400000, indiaCost: 70000 },
  { name: 'ACL Reconstruction', usaCost: 35000, indiaCost: 6000 },
  { name: 'Shoulder Replacement', usaCost: 40000, indiaCost: 9000 },
  { name: 'Rotator Cuff Repair', usaCost: 25000, indiaCost: 5000 },
  { name: 'Sleeve Gastrectomy', usaCost: 25000, indiaCost: 7000 },
  { name: 'Gastric Bypass Surgery', usaCost: 35000, indiaCost: 8500 },
  { name: 'Rhinoplasty', usaCost: 9000, indiaCost: 2500 },
  { name: 'Breast Reconstruction', usaCost: 20000, indiaCost: 5000 },
  { name: 'Chemotherapy (Per Cycle)', usaCost: 12000, indiaCost: 1200 },
  { name: 'Radiation Therapy (Course)', usaCost: 60000, indiaCost: 5000 },
  { name: 'PET Scan', usaCost: 6000, indiaCost: 350 },
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
  { name: 'Cardiology', icon: '❤️', count: 5 },
  { name: 'Orthopedics', icon: '🦴', count: 8 },
  { name: 'Neurosurgery', icon: '🧠', count: 4 },
  { name: 'Oncology', icon: '🔬', count: 6 },
  { name: 'Dentistry', icon: '😁', count: 12 },
  { name: 'IVF', icon: '👶', count: 3 },
]

export default function Home() {
  const { translate } = useTranslation();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {translate('World-Class Healthcare at Affordable Prices')}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {translate('Access premium medical treatments from top hospitals and surgeons worldwide. Save up to 80% while receiving world-class care.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#consultation"
                  className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                >
                  {translate('Schedule Consultation')}
                </a>
                <a
                  href="/treatments"
                  className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-center"
                >
                  {translate('Explore Treatments')}
                </a>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=600&h=400&fit=crop"
                alt="Medical consultation"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.label}</div>
                <p className="text-white/80">{translate(stat.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{translate('Why Choose GD Healthcare?')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-border">
                  <Icon className="text-primary mb-4" size={40} />
                  <h3 className="text-xl font-semibold mb-2">{translate(feature.title)}</h3>
                  <p className="text-muted-foreground">{translate(feature.description)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{translate('Popular Treatments')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {treatmentCategories.map((category, idx) => (
              <Link
                key={idx}
                href={`/treatments?category=${category.name}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow border border-border hover:border-primary"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{translate(category.name)}</h3>
                <p className="text-xs text-muted-foreground">{category.count}+ {translate('procedures')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hospitals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{translate('Our Partner Hospitals')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospitals.slice(0, 3).map((hospital) => (
              <Link
                key={hospital.id}
                href={`/hospitals/${hospital.slug}`}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border hover:border-primary group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={hospital.image}
                    alt={hospital.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{translate(hospital.name)}</h3>
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded">
                      <Star size={16} className="text-yellow-600" />
                      <span className="text-sm font-semibold text-yellow-600">{hospital.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin size={16} />
                    <span className="text-sm">{translate(hospital.country)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{translate(hospital.description)}</p>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specializations.slice(0, 2).map((spec, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
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
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors inline-block"
            >
              {translate('View All Hospitals →')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{translate('Meet Our Expert Doctors')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.slice(0, 3).map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-primary group flex flex-col"
              >
                <div className="relative w-full aspect-[3/4] md:aspect-[2/3] overflow-hidden bg-gray-100">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={doctor.id <= 3}
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-1 line-clamp-1">{translate(doctor.name)}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{translate(doctor.specialization)}</p>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{translate(doctor.hospital)}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-600 fill-yellow-600" />
                      <span className="text-sm font-semibold">{doctor.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{doctor.experience} years experience</p>
                  
                  <div className="mt-auto pt-4 border-t border-border">
                    <div className="text-sm font-semibold text-primary">
                      From ${doctor.consultationFee}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/doctors"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors inline-block"
            >
              {translate('View All Doctors →')}
            </Link>
          </div>
        </div>
      </section>

      {/* Cost Comparison - FIXED */}
      <CostComparison data={costData} />
      <MedicalCostComparison packages={allPackages} /> {/* ✅ Fixed - passing required packages prop */}

      {/* Testimonials */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{translate('Patient Testimonials')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{translate(testimonial.name)}</h4>
                    <p className="text-xs text-muted-foreground">{translate(testimonial.location)}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} className="text-yellow-600 fill-yellow-600" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mb-2">&quot;{translate(testimonial.text)}&quot;</p>
                <p className="text-xs text-primary font-semibold">{translate(testimonial.treatment)} at {translate(testimonial.hospital)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{translate('Frequently Asked Questions')}</h2>
          <div className="space-y-4">
            {faqs.slice(0, 5).map((faq, idx) => (
              <details key={idx} className="bg-card rounded-lg border border-border p-6 hover:border-primary transition-colors cursor-pointer">
                <summary className="font-semibold flex justify-between items-center">
                  {translate(faq.question)}
                  <span className="text-primary">+</span>
                </summary>
                <p className="text-muted-foreground mt-4">{translate(faq.answer)}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
            >
              {translate('Have More Questions? Contact Us')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="consultation" className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{translate('Ready to Transform Your Health?')}</h2>
          <p className="text-lg text-white/90 mb-8">
            {translate('Schedule a free consultation with our medical experts today and start your journey to better health.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919711614738"
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              {translate('Call Now')}
            </a>
            <a
              href="https://wa.me/919711614738"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              {translate('WhatsApp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}