'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { HospitalCard } from '@/components/HospitalCard';
import { hospitals } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const cities = ['All', 'Delhi NCR', 'Bangalore', 'Mumbai'];

export default function HospitalsPage() {
  const t = useTranslation();
  const [selectedCity, setSelectedCity] = useState('All');

  const filteredHospitals = selectedCity === 'All'
    ? hospitals
    : hospitals.filter(h => h.location === selectedCity);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-teal-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('hospitals_page.title')}
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl">
            {t('hospitals_page.subtitle')}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Filter by City</h3>
          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCity === city
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hospitals Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredHospitals.length > 0 ? (
            <>
              <p className="text-gray-600 mb-8">
                Showing {filteredHospitals.length} hospitals
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital.id}
                    name={hospital.name}
                    location={hospital.location}
                    beds={hospital.beds}
                    doctors={hospital.doctors}
                    rating={hospital.rating}
                    description={hospital.description}
                    badges={hospital.badges}
                    phoneNumber={hospital.phoneNumber}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No hospitals found for the selected city.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Need More Information?
          </h2>
          <p className="text-lg text-gray-100 mb-8">
            Get in touch with our medical coordinators for personalized assistance.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Request Free Consultation
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
