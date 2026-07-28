import { BlogForm } from '@/app/admin/blogs/BlogForm'
import { createBlogPost } from '@/app/actions/blogs'

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Write new post</h1>
      <BlogForm action={createBlogPost} />
    </div>
  )
}