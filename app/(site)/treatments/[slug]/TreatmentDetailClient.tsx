'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, TrendingUp, Award } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import type { ITreatment } from '@/lib/models/Treatment'
import type { IHospital } from '@/lib/models/Hospital'
import type { IDoctor } from '@/lib/models/Doctor'

type SerializedTreatment = Omit<ITreatment, '_id' | 'createdAt' | 'updatedAt'> & { _id: string }
type SerializedHospital = Omit<IHospital, '_id' | 'createdAt' | 'updatedAt'> & { _id: string }
type SerializedDoctor = Omit<IDoctor, '_id' | 'createdAt' | 'updatedAt'> & { _id: string }

export function TreatmentDetailClient({
  treatment,
  relatedHospitals,
  relatedDoctors,
}: {
  treatment: SerializedTreatment
  relatedHospitals: SerializedHospital[]
  relatedDoctors: SerializedDoctor[]
}) {
  const { translate } = useTranslation()

  return (
    <div className="w-full">
      {/* Hero Image */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src={treatment.thumbnailUrl}
          alt={translate(treatment.name)}
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
              <p className="text-primary font-semibold text-sm mb-2">{translate(treatment.category)}</p>
              <h1 className="text-4xl font-bold mb-4">{translate(treatment.name)}</h1>
              <p className="text-lg text-muted-foreground">{translate(treatment.description)}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-muted/20 rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{translate('Success Rate')}</p>
                <p className="text-2xl font-bold text-primary">{treatment.successRate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{translate('Hospital Stay')}</p>
                <p className="text-2xl font-bold">{translate(treatment.hospitalStay)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{translate('Recovery Time')}</p>
                <p className="text-2xl font-bold">{translate(treatment.recoveryTime)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{translate('Starting From')}</p>
                <p className="text-2xl font-bold text-primary">${treatment.startingCostUSD.toLocaleString()}</p>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{translate('About This Treatment')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {translate(treatment.name)} {translate('is an advanced medical procedure designed to treat')} {translate(treatment.category.toLowerCase())} {translate('conditions.')}
                {' '}
                {translate('This procedure involves the use of latest medical technology and techniques to ensure optimal patient outcomes.')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {translate('With a success rate of')} {treatment.successRate}, {translate('this treatment has helped thousands of patients achieve better health outcomes. Our expert surgeons use minimally invasive techniques where possible to reduce recovery time and complications.')}
              </p>
            </div>

            {/* Procedure Steps */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{translate('Procedure Steps')}</h2>
              <div className="space-y-4">
                {['Pre-operative assessment', 'Anesthesia administration', 'Surgical procedure', 'Post-operative monitoring', 'Recovery'].map(
                  (step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="pt-1">
                        <h4 className="font-semibold">{translate(step)}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {translate('This is an important step in the')} {translate(treatment.name.toLowerCase())} {translate('procedure.')}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{translate('Benefits of This Treatment')}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Advanced medical technology',
                  'Experienced surgeons',
                  'Minimal invasiveness',
                  'Quick recovery',
                  'High success rate',
                  'Affordable cost',
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>{translate(benefit)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks & Considerations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{translate('Risks & Considerations')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {translate('Like all medical procedures,')} {translate(treatment.name)} {translate('has potential risks that should be discussed with your doctor before treatment.')}
              </p>
              <ul className="space-y-2">
                {['Bleeding', 'Infection', 'Anesthesia reactions', 'Temporary discomfort'].map((risk, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-primary">•</span>
                    <span>{translate(risk)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recovery */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{translate('Recovery & Aftercare')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {translate('Recovery from')} {translate(treatment.name)} {translate('typically takes')} {translate(treatment.recoveryTime)}. {translate("During this time, follow your surgeon's instructions carefully to ensure optimal healing.")}
              </p>
              <div className="bg-muted/20 rounded-lg p-6 border border-border">
                <h4 className="font-semibold mb-3">{translate('Post-operative Care Instructions:')}</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    'Take prescribed medications as directed',
                    'Keep the surgical site clean and dry',
                    'Attend follow-up appointments',
                    'Follow activity restrictions',
                    'Report any complications immediately',
                  ].map((instruction, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary flex-shrink-0 mt-1">✓</span>
                      <span>{translate(instruction)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Hospitals */}
            {relatedHospitals.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{translate('Hospitals Offering This Treatment')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedHospitals.map((hospital) => (
                    <Link
                      key={hospital.slug}
                      href={`/hospitals/${hospital.slug}`}
                      className="p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <h4 className="font-semibold mb-2">{translate(hospital.name)}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{translate(hospital.country)}</p>
                      <p className="text-sm font-semibold text-primary">{translate('View Details')} →</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Doctors */}
            {relatedDoctors.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{translate('Expert Surgeons for This Treatment')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedDoctors.map((doctor) => (
                    <Link
                      key={doctor.slug}
                      href={`/doctors/${doctor.slug}`}
                      className="p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <h4 className="font-semibold mb-1">{translate(doctor.name)}</h4>
                      <p className="text-sm text-primary font-medium mb-2">{translate(doctor.specialization)}</p>
                      <p className="text-sm text-muted-foreground mb-3">{doctor.experience} {translate('years experience')}</p>
                      <p className="text-sm font-semibold text-primary">{translate('View Profile')} →</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Cost & Info */}
            <div className="bg-card rounded-lg p-6 border border-border mb-6 sticky top-20">
              <h3 className="text-xl font-bold mb-6">{translate(treatment.name)}</h3>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{translate('Estimated Cost')}</p>
                  <p className="text-2xl font-bold text-primary">
                    ${treatment.startingCostUSD.toLocaleString()} - ${treatment.averageCostUSD.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded">
                  <Clock size={20} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{translate('Hospital Stay')}</p>
                    <p className="font-semibold">{translate(treatment.hospitalStay)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded">
                  <TrendingUp size={20} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{translate('Success Rate')}</p>
                    <p className="font-semibold">{treatment.successRate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded">
                  <Award size={20} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{translate('Recovery')}</p>
                    <p className="font-semibold">{translate(treatment.recoveryTime)}</p>
                  </div>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-3">
                {translate('Schedule Consultation')}
              </button>

              <a
                href="https://wa.me/919711614738"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                {translate('Ask Questions')}
              </a>
            </div>

            {/* Info Card */}
            <div className="bg-accent/10 rounded-lg p-6 border border-accent">
              <p className="text-sm text-accent font-semibold mb-2">💡 {translate('Important Note')}</p>
              <p className="text-sm text-muted-foreground">
                {translate('Consultation with our medical experts is recommended to assess your specific condition and determine the best treatment approach.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
