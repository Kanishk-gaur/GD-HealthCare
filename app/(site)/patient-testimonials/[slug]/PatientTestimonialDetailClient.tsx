'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import type { IPatientTestimonial } from '@/lib/models/PatientTestimonial'
import type { IDoctor } from '@/lib/models/Doctor'
import type { IHospital } from '@/lib/models/Hospital'
import type { ITreatment } from '@/lib/models/Treatment'
import { PatientTestimonialCard } from '@/components/PatientTestimonialCard'
import { PatientTestimonialStory } from '@/components/PatientTestimonialStory'
import { getYouTubeEmbedUrl } from '@/lib/utils'

type SerializedPost = Omit<IPatientTestimonial, '_id'> & { _id: string }
type SerializedDoctor = Omit<IDoctor, '_id'> & { _id: string }
type SerializedHospital = Omit<IHospital, '_id'> & { _id: string }
type SerializedTreatment = Omit<ITreatment, '_id'> & { _id: string }

function pronounFor(gender: string) {
  if (gender === 'Male') return 'his'
  if (gender === 'Female') return 'her'
  return 'their'
}

export function PatientTestimonialDetailClient({
  post,
  doctor,
  hospital,
  treatment,
  otherPosts,
}: {
  post: SerializedPost
  doctor: SerializedDoctor | null
  hospital: SerializedHospital | null
  treatment: SerializedTreatment | null
  otherPosts: SerializedPost[]
}) {
  const { translate } = useTranslation()
  const embedUrl = getYouTubeEmbedUrl(post.youtubeUrl)
  const lastUpdated = post.updatedAt ?? post.date

  return (
    <div className="w-full">
      {/* Article Header — title and meta as plain text, read before the
          photo rather than overlaid on top of it. */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Link
          href="/patient-testimonials"
          className="flex w-fit items-center gap-1 text-sm font-semibold text-[#ff4c88] hover:underline mb-6"
        >
          <ArrowLeft size={16} /> {translate('Back to Patient Testimonials')}
        </Link>

        <span className="inline-block bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {translate(post.category)}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">{translate(post.title)}</h1>

        <div className="flex items-center gap-6 text-sm text-muted-foreground pb-6 border-b border-border">
          <span className="flex items-center gap-1.5">
            <User size={16} className="text-[#ffa649]" /> {translate(post.author)}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={16} className="text-[#ffa649]" />
            {translate('Last updated:')}{' '}
            {new Date(lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Story photo — framed within the article column at its native 2:1
          ratio, shown complete rather than cropped to fill a banner. */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="relative w-full aspect-2/1 rounded-2xl overflow-hidden shadow-lg border border-[#ffa649]/15">
          <Image
            src={post.image}
            alt={translate(post.patientName)}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Patient Snapshot */}
        <section className="mb-10 bg-card border border-[#ffa649]/10 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-5 pb-3 border-b border-[#ffa649]/10">
            {translate('Patient Snapshot')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{translate("Patient's Name")}</p>
              <p className="text-sm font-semibold text-foreground">{translate(post.patientName)}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{translate('Age')}</p>
              <p className="text-sm font-semibold text-foreground">{post.patientAge} {translate('years')}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{translate('Gender')}</p>
              <p className="text-sm font-semibold text-foreground">{translate(post.patientGender)}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{translate('Country of Origin')}</p>
              <p className="text-sm font-semibold text-foreground">{translate(post.patientCountry)}</p>
            </div>
            {doctor && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{translate('Doctor')}</p>
                <Link href={`/doctors/${doctor.slug}`} className="text-sm text-[#ff4c88] font-semibold hover:underline">
                  {translate(doctor.name)}
                </Link>
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{translate('Hospital')}</p>
              {hospital ? (
                <Link href={`/hospitals/${hospital.slug}`} className="text-sm text-[#ff4c88] font-semibold hover:underline">
                  {translate(post.hospital)}
                </Link>
              ) : (
                <p className="text-sm font-semibold text-foreground">{translate(post.hospital)}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{translate('Treatment')}</p>
              {treatment ? (
                <Link href={`/treatments/${treatment.slug}`} className="text-sm text-[#ff4c88] font-semibold hover:underline">
                  {translate(post.treatment)}
                </Link>
              ) : (
                <p className="text-sm font-semibold text-foreground">{translate(post.treatment)}</p>
              )}
            </div>
          </div>
        </section>

        {/* YouTube Video */}
        {embedUrl && (
          <section className="mb-10 bg-card border border-[#ffa649]/10 rounded-2xl p-6 md:p-8 shadow-sm">
            <p className="font-semibold text-foreground mb-4">
              {translate('Watch')} {translate(post.patientName)} {translate('share')} {translate(pronounFor(post.patientGender))} {translate('experience in the video below')}
            </p>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={embedUrl}
                title={translate(`${post.patientName}'s story`)}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Full Story */}
        <PatientTestimonialStory content={post.content} />
      </div>

      {/* Other stories */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-white to-[#ffa649]/5 border-t border-[#ffa649]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  {translate('Our Happy Patients')}
                </span>
              </h2>
              <Link
                href="/patient-testimonials"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#ff4c88] hover:underline"
              >
                {translate('View all')} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {otherPosts.map((p) => (
                <PatientTestimonialCard key={String(p._id)} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
