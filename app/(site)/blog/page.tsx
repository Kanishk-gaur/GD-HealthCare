import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { connectToDatabase } from '@/lib/mongodb'
import BlogPost, { type IBlogPost } from '@/lib/models/BlogPost'

export const revalidate = 0

export const metadata = {
  title: 'Blog | GD Healthcare',
  description: 'Health guides, treatment insights, and patient stories from GD Healthcare.',
}

export default async function BlogListPage() {
  await connectToDatabase()
  const posts = await BlogPost.find({ published: true })
    .sort({ date: -1 })
    .lean<IBlogPost[]>()

  return (
    <div className="w-full">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-[#ffa649]/10 via-white to-[#ff4c88]/10 py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-[#ffa649]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-[#ff4c88]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              Health &amp; Treatment Insights
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Guides, updates, and patient stories from the GD Healthcare team.
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
                No articles published yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={String(post._id)}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border hover:border-[#ffa649] group flex flex-col transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#ff4c88] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-[#ffa649]/10 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User size={14} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#ff4c88]">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}