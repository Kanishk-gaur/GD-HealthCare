import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import BlogPost, { type IBlogPost } from '@/lib/models/BlogPost'

export const revalidate = 0

export async function generateStaticParams() {
  await connectToDatabase()
  const posts = await BlogPost.find({ published: true }).select('slug').lean<{ slug: string }[]>()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectToDatabase()
  const post = await BlogPost.findOne({ slug, published: true }).lean<IBlogPost>()
  return {
    title: post ? `${post.title} | GD Healthcare Blog` : 'Blog | GD Healthcare',
    description: post?.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectToDatabase()
  const post = await BlogPost.findOne({ slug, published: true }).lean<IBlogPost>()

  if (!post) notFound()

  return (
    <div className="w-full">
      {/* Hero Image */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <span className="inline-block bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#ff4c88] hover:underline mb-8"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
          <span className="flex items-center gap-1.5">
            <User size={16} className="text-[#ffa649]" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={16} className="text-[#ffa649]" /> {new Date(post.date).toLocaleDateString()}
          </span>
        </div>

        {/* Article content — plain text from the admin editor, so we preserve
            line breaks with whitespace-pre-wrap instead of rendering HTML. */}
        <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </div>
  )
}