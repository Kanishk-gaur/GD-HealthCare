'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { PatientTestimonialCard } from '@/components/PatientTestimonialCard'
import type { IPatientTestimonial } from '@/lib/models/PatientTestimonial'

type SerializedPost = Omit<IPatientTestimonial, '_id'> & { _id: string }

export function PatientTestimonialsListClient({ posts }: { posts: SerializedPost[] }) {
  const { translate } = useTranslation()

  return (
    <div className="w-full">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-[#ffa649]/10 via-white to-[#ff4c88]/10 py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-[#ffa649]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-[#ff4c88]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate('Patient Testimonials')}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {translate('Real treatment journeys and outcomes, told by the patients who lived them.')}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-[#ffa649]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#ffa649]/20 shadow-sm">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg text-muted-foreground">
                {translate('No patient testimonials published yet. Check back soon.')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PatientTestimonialCard key={String(post._id)} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
