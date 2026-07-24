'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Award, Briefcase } from 'lucide-react'
import { doctors } from '@/lib/data'

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations')

  // Get unique specializations for filter dropdown
  const specializations = useMemo(() => {
    const unique = new Set(doctors.map(d => d.specialization))
    return ['All Specializations', ...Array.from(unique)]
  }, [])

  // Filter doctors based on search and specialization
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Specialization filter
      const specMatch = selectedSpecialization === 'All Specializations' || 
        doctor.specialization === selectedSpecialization
      
      return searchMatch && specMatch
    })
  }, [searchTerm, selectedSpecialization])

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select 
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No doctors found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedSpecialization('All Specializations')
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor) => (
                <Link
                  key={doctor.id}
                  href={`/doctors/${doctor.slug}`}
                  className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-border hover:border-primary group flex flex-col"
                >
                  {/* Image Container */}
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
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-1 line-clamp-1">{doctor.name}</h3>
                    <p className="text-primary font-semibold text-sm mb-2">{doctor.specialization}</p>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{doctor.hospital}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-600 fill-yellow-600" />
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

                    <div className="pt-4 border-t border-border mt-auto">
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">From ${doctor.consultationFee}</span>
                        <span className="text-muted-foreground"> / consultation</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}