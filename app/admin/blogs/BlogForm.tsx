'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import type { IBlogPost } from '@/lib/models/BlogPost'

interface BlogFormProps {
  action: (formData: FormData) => void
  post?: IBlogPost
}

function toDateInputValue(date?: Date) {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}

export function BlogForm({ action, post }: BlogFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={post?.title} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">
            Slug <span className="text-muted-foreground text-xs">(leave blank to auto-generate)</span>
          </Label>
          <Input id="slug" name="slug" defaultValue={post?.slug} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input id="author" name="author" defaultValue={post?.author} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" defaultValue={post?.category} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Publish date</Label>
          <Input id="date" name="date" type="date" defaultValue={toDateInputValue(post?.date)} />
        </div>
      </div>

      <ImageUploadField label="Cover image" name="image" defaultValue={post?.image} />

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt (shown on the blog listing card)</Label>
        <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={post?.excerpt} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Article content</Label>
        <Textarea id="content" name="content" rows={16} defaultValue={post?.content} required />
      </div>

      <div className="flex items-center gap-2">
        <Switch id="published" name="published" defaultChecked={post?.published ?? true} />
        <Label htmlFor="published">Published (visible on the live site)</Label>
      </div>

      <Button type="submit">{post ? 'Save changes' : 'Publish post'}</Button>
    </form>
  )
}