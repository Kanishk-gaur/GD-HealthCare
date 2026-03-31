'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { DoctorCard } from '@/components/DoctorCard';
import { doctors } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const specialties = ['All', 'Orthopedic Surgery', 'Cardiology', 'Neurosurgery', 'Oncology', 'Urology', 'Gynecology'];

export default function DoctorsPage() {
  const t = useTranslation();
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const filteredDoctors = selectedSpecialty === 'All'
    ? doctors
    : doctors.filter(d => d.specialty === selectedSpecialty);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-teal-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('doctors_page.title')}
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl">
            {t('doctors_page.subtitle')}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Filter by Specialty</h3>
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                  selectedSpecialty === specialty
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDoctors.length > 0 ? (
            <>
              <p className="text-gray-600 mb-8">
                Showing {filteredDoctors.length} doctors
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    name={doctor.name}
                    specialty={doctor.specialty}
                    hospital={doctor.hospital}
                    experience={doctor.experience}
                    qualifications={doctor.qualifications}
                    phoneNumber={doctor.phoneNumber}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No doctors found for the selected specialty.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Consult?
          </h2>
          <p className="text-lg text-gray-100 mb-8">
            Book a consultation with any of our expert doctors today.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Schedule Consultation
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
