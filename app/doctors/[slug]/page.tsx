import Image from 'next/image'
import Link from 'next/link'
import { Star, Award, Briefcase, Phone, Mail, MapPin, Calendar } from 'lucide-react'
import { doctors } from '@/lib/data'

export function generateStaticParams() {
  return doctors.map((doctor) => ({
    slug: doctor.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const doctor = doctors.find((d) => d.slug === params.slug)
  return {
    title: `${doctor?.name} - ${doctor?.specialization} | GD Healthcare`,
    description: `Consult ${doctor?.name}, expert in ${doctor?.specialization} with ${doctor?.experience} years of experience.`,
  }
}

export default function DoctorDetail({ params }: { params: { slug: string } }) {
  const doctor = doctors.find((d) => d.slug === params.slug)

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Doctor Not Found</h1>
          <Link href="/doctors" className="text-primary hover:underline">
            Back to Doctors
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="relative w-48 h-64 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{doctor.name}</h1>
                <p className="text-xl text-primary font-semibold mb-4">{doctor.specialization}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
                    <Star size={20} className="text-yellow-600" />
                    <span className="text-2xl font-bold text-yellow-600">{doctor.rating}</span>
                    <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                  </div>
                </div>

                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Award size={18} className="text-primary" />
                    <span><strong>Qualification:</strong> {doctor.qualification}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase size={18} className="text-primary" />
                    <span><strong>Experience:</strong> {doctor.experience} years</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={18} className="text-primary" />
                    <span><strong>Hospital:</strong> {doctor.hospital}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">About Dr. {doctor.name.split(' ').pop()}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Dr. {doctor.name} is a highly skilled and experienced {doctor.specialization.toLowerCase()} specialist with a
                proven track record of successful treatments. With {doctor.experience} years of professional experience, Dr.{' '}
                {doctor.name.split(' ').pop()} has earned a stellar reputation for medical excellence and patient care.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Holding the prestigious qualification of {doctor.qualification}, Dr. {doctor.name.split(' ').pop()} is dedicated
                to providing world-class healthcare services to patients from around the globe. Their expertise, combined with a
                compassionate approach to patient care, makes them a preferred choice for international patients.
              </p>
            </div>

            {/* Expertise Areas */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Areas of Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Complex Surgical Procedures',
                  'Minimally Invasive Techniques',
                  'Patient Care Management',
                  'Pre & Post-Operative Care',
                  'Advanced Diagnostic Methods',
                  'International Patient Coordination',
                ].map((expertise, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="font-medium">{expertise}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Qualifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Education & Qualifications</h2>
              <div className="space-y-4">
                {[
                  { title: 'Medical Degree (MD)', description: 'Prestigious Medical University' },
                  { title: 'Post-Graduate Specialization', description: doctor.specialization },
                  { title: 'International Fellowship', description: 'Leading Medical Institution' },
                  { title: 'Board Certification', description: 'Medical Excellence Board' },
                ].map((edu, idx) => (
                  <div key={idx} className="p-4 bg-muted/20 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-1">{edu.title}</h4>
                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Languages</h2>
              <div className="flex flex-wrap gap-3">
                {doctor.languages.map((lang, idx) => (
                  <span key={idx} className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Success Stories */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Patient Success Stories</h2>
              <div className="space-y-4">
                {['Patient Recovery Story 1', 'Patient Recovery Story 2', 'Patient Recovery Story 3'].map((story, idx) => (
                  <div key={idx} className="p-4 bg-card rounded-lg border border-border">
                    <p className="text-muted-foreground">{story}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Consultation Card */}
            <div className="bg-card rounded-lg p-6 border border-border mb-6 sticky top-20">
              <h3 className="text-xl font-bold mb-6">Book Consultation</h3>

              <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Consultation Fee</p>
                <p className="text-3xl font-bold text-primary">${doctor.consultationFee}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold">Quick Availability</p>
                    <p className="text-xs text-muted-foreground">Consultations within 48 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star size={20} className="text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold">Highly Rated</p>
                    <p className="text-xs text-muted-foreground">{doctor.reviews}+ patient reviews</p>
                  </div>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-3">
                Book Now
              </button>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                WhatsApp Consultation
              </a>
            </div>

            {/* Hospital Info */}
            <div className="bg-card rounded-lg p-6 border border-border mb-6">
              <h3 className="text-lg font-bold mb-4">Hospital</h3>
              <Link href={`/hospitals`} className="text-primary font-semibold hover:underline mb-4 block">
                {doctor.hospital}
              </Link>
              <p className="text-sm text-muted-foreground mb-4">{doctor.country}</p>
              <a
                href={`/hospitals`}
                className="text-sm text-primary hover:underline font-semibold"
              >
                View Hospital Details →
              </a>
            </div>

            {/* Contact Info */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <a href="tel:+919999999999" className="font-semibold text-primary hover:underline text-sm">
                      +91 9999 999 999
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <a href="mailto:info@gdhealthcare.com" className="font-semibold text-primary hover:underline text-sm">
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
