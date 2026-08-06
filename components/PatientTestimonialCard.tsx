import Image from 'next/image'
import Link from 'next/link'
import { User, Calendar } from 'lucide-react'
import type { IPatientTestimonial } from '@/lib/models/PatientTestimonial'

type PatientTestimonialCardPost = Pick<
  IPatientTestimonial,
  'slug' | 'title' | 'image' | 'excerpt' | 'category' | 'patientName' | 'author' | 'date'
> & { _id?: string; updatedAt?: Date }

export function PatientTestimonialCard({ post }: { post: PatientTestimonialCardPost }) {
  const href = `/patient-testimonials/${post.slug}`
  const lastUpdated = post.updatedAt ?? post.date

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border hover:border-[#ffa649] group flex flex-col transform hover:-translate-y-1">
      <Link href={href} className="relative block w-full aspect-[2/1] overflow-hidden">
        <Image
          src={post.image}
          alt={post.patientName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {post.category}
        </span>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1 uppercase font-semibold tracking-wide">
            <User size={13} /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            {new Date(lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <Link href={href}>
          <h2 className="text-lg font-bold mb-2 line-clamp-2 hover:text-[#ff4c88] transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}{' '}
          <Link href={href} className="text-[#ff4c88] font-semibold hover:underline">
            Read More
          </Link>
        </p>
      </div>
    </div>
  )
}
