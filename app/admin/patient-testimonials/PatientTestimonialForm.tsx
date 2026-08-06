'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import type { IPatientTestimonial } from '@/lib/models/PatientTestimonial'

interface PatientTestimonialFormProps {
  action: (formData: FormData) => void
  post?: IPatientTestimonial
  doctorOptions: { slug: string; name: string }[]
  hospitalOptions: { slug: string; name: string }[]
  treatmentOptions: { slug: string; name: string }[]
}

function toDateInputValue(date?: Date) {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}

export function PatientTestimonialForm({
  action,
  post,
  doctorOptions,
  hospitalOptions,
  treatmentOptions,
}: PatientTestimonialFormProps) {
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

      <ImageUploadField label="Patient image (used as the card thumbnail, 2:1)" name="image" defaultValue={post?.image} />

      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground">Patient details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient name</Label>
            <Input id="patientName" name="patientName" defaultValue={post?.patientName} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patientAge">Age</Label>
            <Input id="patientAge" name="patientAge" type="number" min="0" defaultValue={post?.patientAge} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patientGender">Gender</Label>
            <Select name="patientGender" defaultValue={post?.patientGender || undefined}>
              <SelectTrigger id="patientGender" className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="patientCountry">Country of origin</Label>
            <Input id="patientCountry" name="patientCountry" defaultValue={post?.patientCountry} required />
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground">Treatment details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="treatment">Treatment</Label>
            <Input id="treatment" name="treatment" defaultValue={post?.treatment} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital">Hospital</Label>
            <Input id="hospital" name="hospital" defaultValue={post?.hospital} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="doctorSlug">Doctor profile to link</Label>
            <Select name="doctorSlug" defaultValue={post?.doctorSlug || undefined}>
              <SelectTrigger id="doctorSlug" className="w-full">
                <SelectValue placeholder="Select a doctor (optional)" />
              </SelectTrigger>
              <SelectContent>
                {doctorOptions.map((d) => (
                  <SelectItem key={d.slug} value={d.slug}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospitalSlug">Hospital page to link</Label>
            <Select name="hospitalSlug" defaultValue={post?.hospitalSlug || undefined}>
              <SelectTrigger id="hospitalSlug" className="w-full">
                <SelectValue placeholder="Select a hospital (optional)" />
              </SelectTrigger>
              <SelectContent>
                {hospitalOptions.map((h) => (
                  <SelectItem key={h.slug} value={h.slug}>
                    {h.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="treatmentSlug">Treatment page to link</Label>
          <Select name="treatmentSlug" defaultValue={post?.treatmentSlug || undefined}>
            <SelectTrigger id="treatmentSlug" className="w-full">
              <SelectValue placeholder="Select a treatment (optional)" />
            </SelectTrigger>
            <SelectContent>
              {treatmentOptions.map((t) => (
                <SelectItem key={t.slug} value={t.slug}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="youtubeUrl">
            YouTube video URL <span className="text-muted-foreground text-xs">(optional)</span>
          </Label>
          <Input
            id="youtubeUrl"
            name="youtubeUrl"
            placeholder="https://www.youtube.com/watch?v=..."
            defaultValue={post?.youtubeUrl}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt (shown on the listing card)</Label>
        <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={post?.excerpt} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">
          Full story (long-form description){' '}
          <span className="text-muted-foreground text-xs font-normal">
            — separate paragraphs with a blank line. Use **bold**, lines starting with &quot;- &quot;
            for a checklist, and a line wrapped in quotes for a pull-quote.
          </span>
        </Label>
        <Textarea id="content" name="content" rows={16} defaultValue={post?.content} required />
      </div>

      <div className="flex items-center gap-2">
        <Switch id="published" name="published" defaultChecked={post?.published ?? true} />
        <Label htmlFor="published">Published (visible on the live site)</Label>
      </div>

      <Button type="submit">{post ? 'Save changes' : 'Publish testimonial'}</Button>
    </form>
  )
}
