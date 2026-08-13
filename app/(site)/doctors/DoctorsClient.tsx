'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Award, Briefcase, Search, Filter, X, Users, Globe } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import type { IDoctor } from '@/lib/models/Doctor'

type SerializedDoctor = Omit<IDoctor, '_id' | 'createdAt' | 'updatedAt'> & { _id: string }

export function DoctorsClient({ doctors }: { doctors: SerializedDoctor[] }) {
  const { translate } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations')

  // Get unique specializations for filter dropdown
  const specializations = useMemo(() => {
    const unique = new Set(doctors.map(d => d.specialization))
    return ['All Specializations', ...Array.from(unique)]
  }, [doctors])

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
  }, [searchTerm, selectedSpecialization, doctors])

  // Calculate stats
  const totalExperience = doctors.reduce((acc, doc) => acc + doc.experience, 0)
  const avgExperience = doctors.length ? Math.round(totalExperience / doctors.length) : 0

  return (
    <div className="w-full">
      {/* Header - Updated Gradient */}
      <section className="relative bg-gradient-to-br from-[#ffa649]/10 via-white to-[#ff4c88]/10 py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-[#ffa649]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-[#ff4c88]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('Our Expert Doctors')}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {translate('Meet our team of world-renowned surgeons and specialists with international credentials')}
          </p>
          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#ff4c88]" />
              <span className="text-2xl font-bold text-[#ff4c88]">{doctors.length}</span>
              <span className="text-sm text-muted-foreground">{translate('Expert Doctors')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={18} className="text-[#ffa649]" />
              <span className="text-2xl font-bold text-[#ffa649]">{avgExperience}+</span>
              <span className="text-sm text-muted-foreground">{translate('Years Avg. Experience')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-[#ff4c88]" />
              <span className="text-2xl font-bold text-[#ff4c88]">{specializations.length - 1}</span>
              <span className="text-sm text-muted-foreground">{translate('Specializations')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section - Updated */}
      <section className="py-6 border-b border-[#ffa649]/10 bg-white/50 backdrop-blur-sm sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3 text-[#ffa649]" />
              <input
                type="text"
                placeholder={translate('Search doctors by name, specialization, or hospital...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffa649] focus:border-transparent bg-card transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-[#ff4c88] transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="relative md:w-64">
              <Filter size={18} className="absolute left-3 top-3 text-[#ffa649]" />
              <select 
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffa649] focus:border-transparent bg-card appearance-none transition-all duration-300"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>{translate(spec)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid - Updated */}
      <section className="py-16 bg-gradient-to-b from-white to-[#ffa649]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results count */}
          <div className="mb-6 text-sm text-muted-foreground">
            <span className="font-semibold text-[#ff4c88]">{filteredDoctors.length}</span> {translate('doctors found')}
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#ffa649]/20 shadow-sm">
              <div className="text-6xl mb-4">👨‍⚕️</div>
              <p className="text-lg text-muted-foreground mb-4">{translate('No doctors found matching your criteria')}</p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedSpecialization('All Specializations')
                }}
                className="px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white hover:shadow-lg hover:shadow-[#ff4c88]/30 transition-all duration-300 hover:scale-105"
              >
                {translate('Clear filters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor, idx) => (
                <Link
                  key={doctor._id}
                  href={`/doctors/${doctor.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border hover:border-[#ffa649] group flex flex-col transform hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[3/4] md:aspect-[2/3] overflow-hidden bg-gradient-to-br from-[#ffa649]/10 to-[#ff4c88]/10">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={doctor.image}
                      alt={translate(doctor.name)}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={idx < 3}
                    />
                    {/* Rating Badge on Image */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-gray-800">{doctor.rating}</span>
                    </div>
                    {/* Experience Badge on Image */}
                    <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Briefcase size={14} className="text-white" />
                      <span className="text-xs font-medium text-white">{doctor.experience} {translate('years exp.')}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-1 line-clamp-1 group-hover:text-[#ff4c88] transition-colors">
                      {translate(doctor.name)}
                    </h3>
                    <p className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent font-semibold text-sm mb-2">
                      {translate(doctor.specialization)}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffa649]"></span>
                      {translate(doctor.hospital)}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold">{doctor.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({doctor.reviews} {translate('reviews')})</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {doctor.languages.slice(0, 3).map((lang, idx) => (
                        <span key={idx} className="text-xs bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 text-[#ff4c88] px-3 py-1 rounded-full font-medium">
                          {translate(lang)}
                        </span>
                      ))}
                      {doctor.languages.length > 3 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{doctor.languages.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#ffa649]/10 mt-auto">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                          ${doctor.consultationFee}
                        </span>
                        <span className="text-xs text-muted-foreground">/ {translate('consultation')}</span>
                      </div>
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