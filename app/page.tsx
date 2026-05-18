'use client';

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Stethoscope, DollarSign, Clock, TrendingUp, CheckCircle } from 'lucide-react'
import { hospitals, doctors, treatments, testimonials, faqs } from '@/lib/data'
import { useTranslation } from '@/hooks/useTranslation'

const stats = [
  { label: '5000+', description: 'Successful Surgeries', icon: '✓' },
  { label: '50K+', description: 'Happy Patients', icon: '😊' },
  { label: '80%', description: 'Cost Savings', icon: '💰' },
  { label: '200+', description: 'Expert Doctors', icon: '👨‍⚕️' },
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
  // No array arguments passed anymore! The hook tracks text dynamically as it renders.
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
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border hover:border-primary"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{translate(doctor.name)}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{translate(doctor.specialization)}</p>
                  <p className="text-xs text-muted-foreground mb-4">{translate(doctor.hospital)}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-600" />
                      <span className="text-sm font-semibold">{doctor.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{doctor.experience} years experience</p>
                  <div className="text-sm font-semibold text-primary">
                    From ${doctor.consultationFee}
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

      {/* Cost Comparison */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">{translate('Cost Comparison: India vs Western Countries')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-3 font-semibold">{translate('Procedure')}</th>
                  <th className="px-6 py-3 font-semibold text-center">{translate('USA Cost')}</th>
                  <th className="px-6 py-3 font-semibold text-center">{translate('India Cost')}</th>
                  <th className="px-6 py-3 font-semibold text-center">{translate('Savings')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Heart Bypass Surgery', usa: 120000, india: 18000 },
                  { name: 'Knee Replacement', usa: 35000, india: 13000 },
                  { name: 'Brain Tumor Surgery', usa: 150000, india: 28000 },
                  { name: 'Dental Implants', usa: 6000, india: 1200 },
                ].map((item, idx) => {
                  const savings = ((item.usa - item.india) / item.usa * 100).toFixed(0)
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-muted/20'} >
                      <td className="px-6 py-3 font-semibold">{translate(item.name)}</td>
                      <td className="px-6 py-3 text-center">${item.usa.toLocaleString()}</td>
                      <td className="px-6 py-3 text-center text-primary font-semibold">${item.india.toLocaleString()}</td>
                      <td className="px-6 py-3 text-center">
                        <span className="bg-accent text-white px-3 py-1 rounded font-semibold">
                          {savings}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

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
              href="tel:+919999999999"
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              {translate('Call Now')}
            </a>
            <a
              href="https://wa.me/919999999999"
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