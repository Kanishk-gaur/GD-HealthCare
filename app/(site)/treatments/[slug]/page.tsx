import Image from 'next/image'
import Link from 'next/link'
import { Clock, TrendingUp, Award } from 'lucide-react'
import { connectToDatabase } from '@/lib/mongodb'
import TreatmentModel, { type ITreatment } from '@/lib/models/Treatment'
import Hospital, { type IHospital } from '@/lib/models/Hospital'
import Doctor, { type IDoctor } from '@/lib/models/Doctor'

export const revalidate = 0

export async function generateStaticParams() {
  await connectToDatabase()
  const treatments = await TreatmentModel.find().select('slug').lean<{ slug: string }[]>()
  return treatments.map((treatment) => ({
    slug: treatment.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectToDatabase()
  const treatment = await TreatmentModel.findOne({ slug }).lean<ITreatment>()
  return {
    title: `${treatment?.name} | GD Healthcare`,
    description: `Learn about ${treatment?.name} - cost, procedure, success rate, and top hospitals offering this treatment.`,
  }
}

export default async function TreatmentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectToDatabase()
  const treatment = await TreatmentModel.findOne({ slug }).lean<ITreatment>()

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Treatment Not Found</h1>
          <Link href="/treatments" className="text-primary hover:underline">
            Back to Treatments
          </Link>
        </div>
      </div>
    )
  }

  // Slug-based matching — reliable regardless of how a hospital/doctor's
  // display name is edited later in the admin panel.
  const [relatedHospitals, relatedDoctors] = await Promise.all([
    Hospital.find({ slug: { $in: treatment.recommendedHospitalSlugs } }).lean<IHospital[]>(),
    Doctor.find({ slug: { $in: treatment.recommendedDoctorSlugs } }).lean<IDoctor[]>(),
  ])

  return (
    <div className="w-full">
      {/* Hero Image */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src={treatment.thumbnailUrl}
          alt={treatment.name}
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
              <p className="text-primary font-semibold text-sm mb-2">{treatment.category}</p>
              <h1 className="text-4xl font-bold mb-4">{treatment.name}</h1>
              <p className="text-lg text-muted-foreground">{treatment.description}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-muted/20 rounded-lg border border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-primary">{treatment.successRate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hospital Stay</p>
                <p className="text-2xl font-bold">{treatment.hospitalStay}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Recovery Time</p>
                <p className="text-2xl font-bold">{treatment.recoveryTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Starting From</p>
                <p className="text-2xl font-bold text-primary">${treatment.startingCostUSD.toLocaleString()}</p>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">About This Treatment</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {treatment.name} is an advanced medical procedure designed to treat {treatment.category.toLowerCase()} conditions.
                This procedure involves the use of latest medical technology and techniques to ensure optimal patient outcomes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a success rate of {treatment.successRate}, this treatment has helped thousands of patients achieve better health
                outcomes. Our expert surgeons use minimally invasive techniques where possible to reduce recovery time and complications.
              </p>
            </div>

            {/* Procedure Steps */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Procedure Steps</h2>
              <div className="space-y-4">
                {['Pre-operative assessment', 'Anesthesia administration', 'Surgical procedure', 'Post-operative monitoring', 'Recovery'].map(
                  (step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="pt-1">
                        <h4 className="font-semibold">{step}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          This is an important step in the {treatment.name.toLowerCase()} procedure.
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Benefits of This Treatment</h2>
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
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks & Considerations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Risks & Considerations</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Like all medical procedures, {treatment.name} has potential risks that should be discussed with your doctor before treatment.
              </p>
              <ul className="space-y-2">
                {['Bleeding', 'Infection', 'Anesthesia reactions', 'Temporary discomfort'].map((risk, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                    <span className="text-primary">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recovery */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Recovery & Aftercare</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Recovery from {treatment.name} typically takes {treatment.recoveryTime}. During this time, follow your surgeon&apos;s
                instructions carefully to ensure optimal healing.
              </p>
              <div className="bg-muted/20 rounded-lg p-6 border border-border">
                <h4 className="font-semibold mb-3">Post-operative Care Instructions:</h4>
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
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Hospitals */}
            {relatedHospitals.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Hospitals Offering This Treatment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedHospitals.map((hospital) => (
                    <Link
                      key={hospital.slug}
                      href={`/hospitals/${hospital.slug}`}
                      className="p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <h4 className="font-semibold mb-2">{hospital.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{hospital.country}</p>
                      <p className="text-sm font-semibold text-primary">View Details →</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Doctors */}
            {relatedDoctors.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Expert Surgeons for This Treatment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedDoctors.map((doctor) => (
                    <Link
                      key={doctor.slug}
                      href={`/doctors/${doctor.slug}`}
                      className="p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <h4 className="font-semibold mb-1">{doctor.name}</h4>
                      <p className="text-sm text-primary font-medium mb-2">{doctor.specialization}</p>
                      <p className="text-sm text-muted-foreground mb-3">{doctor.experience} years experience</p>
                      <p className="text-sm font-semibold text-primary">View Profile →</p>
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
              <h3 className="text-xl font-bold mb-6">{treatment.name}</h3>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Cost</p>
                  <p className="text-2xl font-bold text-primary">
                    ${treatment.startingCostUSD.toLocaleString()} - ${treatment.averageCostUSD.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded">
                  <Clock size={20} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Hospital Stay</p>
                    <p className="font-semibold">{treatment.hospitalStay}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded">
                  <TrendingUp size={20} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                    <p className="font-semibold">{treatment.successRate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded">
                  <Award size={20} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Recovery</p>
                    <p className="font-semibold">{treatment.recoveryTime}</p>
                  </div>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-3">
                Schedule Consultation
              </button>

              <a
                href="https://wa.me/919711614738"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Ask Questions
              </a>
            </div>

            {/* Info Card */}
            <div className="bg-accent/10 rounded-lg p-6 border border-accent">
              <p className="text-sm text-accent font-semibold mb-2">💡 Important Note</p>
              <p className="text-sm text-muted-foreground">
                Consultation with our medical experts is recommended to assess your specific condition and determine the best treatment approach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
