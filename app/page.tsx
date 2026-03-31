'use client';

import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ContactButton } from '@/components/ContactButton';
import { TreatmentCard } from '@/components/TreatmentCard';
import { HospitalCard } from '@/components/HospitalCard';
import { ServiceCard } from '@/components/ServiceCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { hospitals, treatments, services, testimonials } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const t = useTranslation();

  const processSteps = [
    { icon: '📄', label: t('process.step1') },
    { icon: '👨‍⚕️', label: t('process.step2') },
    { icon: '💰', label: t('process.step3') },
    { icon: '✈️', label: t('process.step4') },
    { icon: '🛬', label: t('process.step5') },
    { icon: '🏥', label: t('process.step6') },
    { icon: '💊', label: t('process.step7') },
  ];

  const benefits = [
    { stat: '70%', label: t('benefits.cost') },
    { stat: '5000+', label: 'Happy Patients' },
    { stat: '50+', label: 'Partner Hospitals' },
    { stat: '24/7', label: 'Patient Support' },
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-teal-600 text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-gray-100 mb-8 text-balance">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/consultation"
                  className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                >
                  {t('cta.consult')}
                  <ArrowRight size={20} />
                </Link>
                <WhatsAppButton
                  phoneNumber="+919876543210"
                  message="Hi, I would like to inquire about medical treatment at GD Healthcare"
                  text={t('hero.whatsapp')}
                  color="green"
                  className="!bg-green-500 hover:!bg-green-600"
                />
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span className="text-sm">JCI Accredited</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span className="text-sm">NABH Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span className="text-sm">ISO Certified</span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-96 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <div className="text-9xl">🏥</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Focus on Diseases Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('treatments.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('treatments.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment, index) => (
              <TreatmentCard
                key={index}
                icon={treatment.icon}
                title={treatment.title}
                description={treatment.description}
                buttonColor={['green', 'teal', 'blue', 'orange', 'purple', 'cyan'][index % 6] as any}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Top Hospitals Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('hospitals.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {t('hospitals.subtitle')}
            </p>
            <Link
              href="/hospitals"
              className="inline-flex items-center gap-2 text-primary hover:text-blue-700 font-semibold"
            >
              {t('hospitals.cta')}
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.slice(0, 6).map((hospital) => (
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
        </div>
      </section>

      {/* 4. How We Work Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('process.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('process.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-teal-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4">
                  {step.icon}
                </div>
                <p className="text-center text-sm font-medium text-gray-900 text-pretty">
                  {step.label}
                </p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute mt-20 text-2xl text-gray-300">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-primary text-white hover:bg-blue-700 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('cta.consult')}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Our Services Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                color={service.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                country={testimonial.country}
                condition={testimonial.condition}
                testimonial={testimonial.testimonial}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Benefits Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            {t('benefits.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-4">{benefit.stat}</div>
                <p className="text-lg text-gray-100">{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            {t('cta.ready')}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-blue-700 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('cta.consult')}
              <ArrowRight size={20} />
            </Link>
            <ContactButton
              type="phone"
              value="+919876543210"
              text={t('cta.call')}
              color="blue"
            />
            <WhatsAppButton
              phoneNumber="+919876543210"
              message="Hi, I would like to know more about medical treatment at GD Healthcare"
              text={t('cta.whatsapp')}
              color="green"
            />
          </div>
        </div>
      </section>

      {/* 9. Free Consultation Form Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {t('form.title')}
            </h2>
            <p className="text-gray-600 mb-8">{t('form.subtitle')}</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    {t('form.country')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="United States"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t('form.medical_condition')}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your medical condition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell us more about your condition..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="bg-primary text-white hover:bg-blue-700 font-semibold px-8 py-3 rounded-lg transition-colors flex-1"
                >
                  {t('form.submit')}
                </button>
                <WhatsAppButton
                  phoneNumber="+919876543210"
                  message="I would like to request a consultation. Please provide more information about medical treatment options."
                  text={t('form.whatsapp_submit')}
                  color="green"
                  className="flex-1 justify-center"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
