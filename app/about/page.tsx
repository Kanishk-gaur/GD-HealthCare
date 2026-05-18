import Image from 'next/image'
import { Award, Users, Globe, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'About GD Healthcare | Medical Tourism',
  description: 'Learn about GD Healthcare, your trusted partner for world-class medical tourism services.',
}

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About GD Healthcare</h1>
          <p className="text-lg text-muted-foreground">
            Leading medical tourism platform connecting patients with world-class healthcare
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At GD Healthcare, our mission is to make world-class medical treatment accessible and affordable for everyone.
                We believe that quality healthcare should not be a luxury, but a right.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through our network of internationally accredited hospitals and experienced doctors, we help patients access
                premium medical services at a fraction of the cost in developed countries.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-112173e7f9db?w=600&h=400&fit=crop"
                alt="GD Healthcare"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
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
                  <div key={idx} className="bg-card rounded-lg p-6 border border-border text-center">
                    <Icon className="text-primary mx-auto mb-4" size={40} />
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-16 bg-muted/20 rounded-lg p-12 border border-border">
            <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '5000+', label: 'Successful Surgeries' },
                { number: '50K+', label: 'Happy Patients' },
                { number: '200+', label: 'Expert Doctors' },
                { number: '20+', label: 'Partner Countries' },
              ].map((achievement, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{achievement.number}</p>
                  <p className="text-muted-foreground">{achievement.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose GD Healthcare?</h2>
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
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-muted-foreground">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
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
                    <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-primary"></div>
                  )}
                  <div className="bg-card rounded-lg p-6 border border-border text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-white/90 mb-8">
            Contact us today for a free consultation and personalized treatment plan.
          </p>
          <a
            href="/contact"
            className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors inline-block"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  )
}
