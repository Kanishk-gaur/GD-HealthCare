'use client'

import Image from 'next/image'
import { Award, Users, Globe, TrendingUp } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export function AboutClient() {
  const { translate } = useTranslation()

  return (
    <div className="w-full">
      {/* Header - Updated Gradient */}
      <section className="relative bg-gradient-to-br from-[#ffa649]/10 via-white to-[#ff4c88]/10 py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-[#ffa649]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-[#ff4c88]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('About GD Healthcare')}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            {translate('Leading medical tourism platform connecting patients with world-class healthcare')}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-gradient-to-b from-white to-[#ffa649]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  {translate('Our Mission')}
                </span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {translate('At GD Healthcare, our mission is to make world-class medical treatment accessible and affordable for everyone. We believe that quality healthcare should not be a luxury, but a right.')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {translate('Through our network of internationally accredited hospitals and experienced doctors, we help patients access premium medical services at a fraction of the cost in developed countries.')}
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg border border-[#ffa649]/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ffa649]/20 to-[#ff4c88]/20 z-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1576091160550-112173e7f9db?w=600&h=400&fit=crop"
                alt={translate('GD Healthcare')}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Core Values - Updated */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                {translate('Our Core Values')}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Excellence',
                  description: 'Maintaining the highest standards in medical care and patient service',
                  icon: Award,
                },
                {
                  title: 'Integrity',
                  description: 'Transparent and ethical practices in all our dealings',
                  icon: Users,
                },
                {
                  title: 'Global Reach',
                  description: 'Connecting patients from across the world with best healthcare',
                  icon: Globe,
                },
                {
                  title: 'Growth',
                  description: 'Continuously improving our services and patient outcomes',
                  icon: TrendingUp,
                },
              ].map((value, idx) => {
                const Icon = value.icon
                return (
                  <div key={idx} className="bg-card rounded-lg p-6 border border-[#ffa649]/10 hover:border-[#ffa649] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff4c88]/10 text-center group">
                    <Icon className="text-[#ffa649] mx-auto mb-4 group-hover:text-[#ff4c88] transition-colors" size={40} />
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#ff4c88] transition-colors">{translate(value.title)}</h3>
                    <p className="text-sm text-muted-foreground">{translate(value.description)}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Achievements - Updated */}
          <div className="mb-16 bg-gradient-to-br from-[#ffa649]/10 via-white to-[#ff4c88]/10 rounded-lg p-12 border border-[#ffa649]/20 shadow-sm">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                {translate('Our Achievements')}
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '5000+', label: 'Successful Surgeries' },
                { number: '50K+', label: 'Happy Patients' },
                { number: '200+', label: 'Expert Doctors' },
                { number: '20+', label: 'Partner Countries' },
              ].map((achievement, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent mb-2">
                    {achievement.number}
                  </p>
                  <p className="text-muted-foreground">{translate(achievement.label)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us - Updated */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                {translate('Why Choose GD Healthcare?')}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                'JCI-accredited hospitals with world-class facilities',
                'Experienced surgeons trained internationally',
                '50-80% cost savings compared to Western countries',
                'Comprehensive patient support from consultation to recovery',
                'HIPAA-compliant data security and privacy',
                'Transparent pricing with no hidden costs',
                'Multi-language support for international patients',
                'Visa assistance and travel arrangements',
              ].map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3 group hover:bg-[#ffa649]/5 p-2 rounded-lg transition-colors">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-[#ff4c88]/20">
                    ✓
                  </div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">{translate(reason)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process - Updated */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                {translate('Our Process')}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  number: 1,
                  title: 'Consultation',
                  description: 'Free initial consultation with our medical experts',
                },
                {
                  number: 2,
                  title: 'Planning',
                  description: 'Personalized treatment plan and cost estimation',
                },
                {
                  number: 3,
                  title: 'Coordination',
                  description: 'Complete arrangements and travel coordination',
                },
                {
                  number: 4,
                  title: 'Treatment',
                  description: 'Expert care with 24/7 patient support',
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#ffa649] to-[#ff4c88]"></div>
                  )}
                  <div className="bg-card rounded-lg p-6 border border-[#ffa649]/10 hover:border-[#ffa649] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff4c88]/10 text-center group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white flex items-center justify-center font-bold mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md shadow-[#ff4c88]/30">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#ff4c88] transition-colors">{translate(step.title)}</h3>
                    <p className="text-sm text-muted-foreground">{translate(step.description)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Updated Gradient */}
      <section className="py-16 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{translate('Ready to Start Your Journey?')}</h2>
          <p className="text-lg text-white/90 mb-8">
            {translate('Contact us today for a free consultation and personalized treatment plan.')}
          </p>
          <a
            href="/contact"
            className="px-8 py-3 bg-white text-[#ff4c88] rounded-lg font-semibold hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 inline-block"
          >
            {translate('Get Started')}
          </a>
        </div>
      </section>
    </div>
  )
}
