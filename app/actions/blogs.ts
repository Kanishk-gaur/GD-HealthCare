'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import BlogPost from '@/lib/models/BlogPost'
import { toSlug } from '@/lib/admin-utils'

function buildBlogData(formData: FormData) {
  const title = String(formData.get('title') || '')
  return {
    slug: toSlug(String(formData.get('slug') || title)),
    title,
    author: String(formData.get('author') || ''),
    date: formData.get('date') ? new Date(String(formData.get('date'))) : new Date(),
    image: String(formData.get('image') || ''),
    excerpt: String(formData.get('excerpt') || ''),
    category: String(formData.get('category') || ''),
    content: String(formData.get('content') || ''),
    published: formData.get('published') === 'on',
  }
}

export async function createBlogPost(formData: FormData) {
  await connectToDatabase()
  const data = buildBlogData(formData)
  await BlogPost.create(data)
  revalidatePath('/admin/blogs')
  revalidatePath('/blogs')
  redirect('/admin/blogs')
}

export async function updateBlogPost(id: string, formData: FormData) {
  await connectToDatabase()
  const data = buildBlogData(formData)
  await BlogPost.findByIdAndUpdate(id, data)
  revalidatePath('/admin/blogs')
  revalidatePath('/blogs')
  revalidatePath(`/blogs/${data.slug}`)
  redirect('/admin/blogs')
}

export async function deleteBlogPost(id: string) {
  await connectToDatabase()
  await BlogPost.findByIdAndDelete(id)
  revalidatePath('/admin/blogs')
  revalidatePath('/blogs')
}