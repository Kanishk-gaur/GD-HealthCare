import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Bed, Award, Phone, Mail } from 'lucide-react'
import { hospitals } from '@/lib/data'

export function generateStaticParams() {
  return hospitals.map((hospital) => ({
    slug: hospital.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const hospital = hospitals.find((h) => h.slug === params.slug)
  return {
    title: `${hospital?.name} | GD Healthcare`,
    description: hospital?.description,
  }
}

export default function HospitalDetail({ params }: { params: { slug: string } }) {
  const hospital = hospitals.find((h) => h.slug === params.slug)

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Hospital Not Found</h1>
          <Link href="/hospitals" className="text-primary hover:underline">
            Back to Hospitals
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Hero Image */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src={hospital.image}
          alt={hospital.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{hospital.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin size={18} />
                    <span>{hospital.country}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
                  <Star size={20} className="text-yellow-600" />
                  <span className="text-2xl font-bold text-yellow-600">{hospital.rating}</span>
                  <span className="text-sm text-muted-foreground">({hospital.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">{hospital.description}</p>
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-muted/20 rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hospital Beds</p>
                <p className="text-2xl font-bold">{hospital.beds}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Established</p>
                <p className="text-2xl font-bold">{hospital.established}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rating</p>
                <p className="text-2xl font-bold">{hospital.rating}/5.0</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reviews</p>
                <p className="text-2xl font-bold">{hospital.reviews}</p>
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Specializations</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hospital.specializations.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <Award size={24} className="text-primary flex-shrink-0" />
                    <span className="font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accreditations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Accreditations & Certifications</h2>
              <div className="flex gap-4">
                {hospital.accreditations.map((accred, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-3 bg-primary/10 text-primary rounded-lg font-semibold border-2 border-primary/30"
                  >
                    {accred}
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">About This Hospital</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {hospital.name} is a world-renowned medical facility dedicated to providing exceptional healthcare services.
                With over {new Date().getFullYear() - hospital.established} years of experience, we have successfully treated
                thousands of international patients and earned a stellar reputation for medical excellence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of highly qualified doctors, state-of-the-art equipment, and patient-centric approach make us a preferred
                choice for medical tourism. We are accredited by international bodies and maintain the highest standards of quality
                and safety.
              </p>
            </div>

            {/* Facilities */}
            <div>
              <h2 className="text-2xl font-bold mb-6">World-Class Facilities</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Advanced Operating Theatres',
                  'ICU & Critical Care Units',
                  '24/7 Emergency Services',
                  'Laboratory Services',
                  'Imaging Centers',
                  'Pharmacy Services',
                  'Blood Bank',
                  'Cafeteria & Accommodation',
                ].map((facility, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Cost Info */}
            <div className="bg-card rounded-lg p-6 border border-border mb-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Average Treatment Costs</h3>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                <p className="text-3xl font-bold text-primary">
                  ${hospital.avgCost.min.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  up to ${hospital.avgCost.max.toLocaleString()}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">✓</span> JCI Accredited
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">✓</span> Expert Surgeons
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">✓</span> Modern Equipment
                </p>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-3">
                Schedule Consultation
              </button>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact Info */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <a href="tel:+919999999999" className="font-semibold text-primary hover:underline">
                      +91 9999 999 999
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a href="mailto:info@gdhealthcare.com" className="font-semibold text-primary hover:underline">
                      info@gdhealthcare.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="font-semibold">{hospital.country}</p>
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
