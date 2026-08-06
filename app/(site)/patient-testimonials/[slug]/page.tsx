import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import PatientTestimonial, { type IPatientTestimonial } from '@/lib/models/PatientTestimonial'
import Doctor, { type IDoctor } from '@/lib/models/Doctor'
import Hospital, { type IHospital } from '@/lib/models/Hospital'
import Treatment, { type ITreatment } from '@/lib/models/Treatment'
import { PatientTestimonialCard } from '@/components/PatientTestimonialCard'
import { PatientTestimonialStory } from '@/components/PatientTestimonialStory'
import { getYouTubeEmbedUrl } from '@/lib/utils'

export const revalidate = 0

function pronounFor(gender: string) {
  if (gender === 'Male') return 'his'
  if (gender === 'Female') return 'her'
  return 'their'
}

export async function generateStaticParams() {
  await connectToDatabase()
  const posts = await PatientTestimonial.find({ published: true }).select('slug').lean<{ slug: string }[]>()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectToDatabase()
  const post = await PatientTestimonial.findOne({ slug, published: true }).lean<IPatientTestimonial>()
  return {
    title: post ? `${post.title} | GD Healthcare Patient Testimonials` : 'Patient Testimonials | GD Healthcare',
    description: post?.excerpt,
  }
}

export default async function PatientTestimonialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectToDatabase()
  const post = await PatientTestimonial.findOne({ slug, published: true }).lean<IPatientTestimonial>()

  if (!post) notFound()

  const [doctor, hospital, treatment, otherPosts] = await Promise.all([
    post.doctorSlug ? Doctor.findOne({ slug: post.doctorSlug }).lean<IDoctor>() : null,
    post.hospitalSlug ? Hospital.findOne({ slug: post.hospitalSlug }).lean<IHospital>() : null,
    post.treatmentSlug ? Treatment.findOne({ slug: post.treatmentSlug }).lean<ITreatment>() : null,
    PatientTestimonial.find({ published: true, slug: { $ne: post.slug } })
      .sort({ date: -1 })
      .limit(4)
      .lean<IPatientTestimonial[]>(),
  ])

  const embedUrl = getYouTubeEmbedUrl(post.youtubeUrl)
  const lastUpdated = post.updatedAt ?? post.date

  return (
    <div className="w-full">
      {/* Hero Image */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        <Image src={post.image} alt={post.patientName} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <span className="inline-block bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/patient-testimonials"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#ff4c88] hover:underline mb-8"
        >
          <ArrowLeft size={16} /> Back to Patient Testimonials
        </Link>

        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
          <span className="flex items-center gap-1.5">
            <User size={16} className="text-[#ffa649]" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={16} className="text-[#ffa649]" />
            Last updated:{' '}
            {new Date(lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Patient Snapshot */}
        <section className="mb-10 space-y-2.5 text-base">
          <p>
            <span className="font-bold text-foreground">Patient&rsquo;s Name:</span> {post.patientName}
          </p>
          <p>
            <span className="font-bold text-foreground">Age:</span> {post.patientAge} years
          </p>
          <p>
            <span className="font-bold text-foreground">Gender:</span> {post.patientGender}
          </p>
          <p>
            <span className="font-bold text-foreground">Country of Origin:</span> {post.patientCountry}
          </p>
          {doctor && (
            <p>
              <span className="font-bold text-foreground">Doctor:</span>{' '}
              <Link href={`/doctors/${doctor.slug}`} className="text-[#ff4c88] font-semibold hover:underline">
                {doctor.name}
              </Link>
            </p>
          )}
          <p>
            <span className="font-bold text-foreground">Hospital:</span>{' '}
            {hospital ? (
              <Link href={`/hospitals/${hospital.slug}`} className="text-[#ff4c88] font-semibold hover:underline">
                {post.hospital}
              </Link>
            ) : (
              post.hospital
            )}
          </p>
          <p>
            <span className="font-bold text-foreground">Treatment:</span>{' '}
            {treatment ? (
              <Link
                href={`/treatments/${treatment.slug}`}
                className="text-[#ff4c88] font-semibold hover:underline"
              >
                {post.treatment}
              </Link>
            ) : (
              post.treatment
            )}
          </p>
        </section>

        {/* YouTube Video */}
        {embedUrl && (
          <section className="mb-10">
            <p className="font-semibold text-foreground mb-3">
              Watch {post.patientName} share {pronounFor(post.patientGender)} experience in the video below
            </p>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-[#ffa649]/15">
              <iframe
                src={embedUrl}
                title={`${post.patientName}'s story`}
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
                  Our Happy Patients
                </span>
              </h2>
              <Link
                href="/patient-testimonials"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#ff4c88] hover:underline"
              >
                View all <ArrowRight size={14} />
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
