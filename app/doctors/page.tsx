import Image from 'next/image'
import Link from 'next/link'
import { Star, Award, Briefcase } from 'lucide-react'
import { doctors } from '@/lib/data'

export const metadata = {
  title: 'Expert Doctors | GD Healthcare',
  description: 'Discover world-renowned doctors specializing in various medical fields. Book consultations with top surgeons.',
}

export default function DoctorsPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Expert Doctors</h1>
          <p className="text-lg text-muted-foreground">
            Meet our team of world-renowned surgeons and specialists with international credentials
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search doctors..."
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Specializations</option>
              <option>Cardiac Surgery</option>
              <option>Orthopedic Surgery</option>
              <option>Neurosurgery</option>
              <option>Oncology</option>
            </select>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.slug}`}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-border hover:border-primary group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-2">{doctor.specialization}</p>
                  <p className="text-xs text-muted-foreground mb-4">{doctor.hospital}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-600" />
                      <span className="text-sm font-semibold">{doctor.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Briefcase size={16} />
                    <span>{doctor.experience} years experience</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctor.languages.slice(0, 2).map((lang, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">From ${doctor.consultationFee}</span>
                      <span className="text-muted-foreground"> / consultation</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
