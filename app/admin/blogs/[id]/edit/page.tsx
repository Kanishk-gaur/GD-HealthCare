import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import BlogPost, { type IBlogPost } from '@/lib/models/BlogPost'
import { BlogForm } from '@/app/admin/blogs/BlogForm'
import { updateBlogPost } from '@/app/actions/blogs'

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const post = await BlogPost.findById(id).lean<IBlogPost>()

  if (!post) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit post</h1>
      <BlogForm action={updateBlogPost.bind(null, id)} post={post} />
    </div>
  )
}