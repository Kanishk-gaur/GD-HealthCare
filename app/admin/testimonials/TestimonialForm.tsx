'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import type { ITestimonial } from '@/lib/models/Testimonial'

interface TestimonialFormProps {
  action: (formData: FormData) => void
  testimonial?: ITestimonial
}

export function TestimonialForm({ action, testimonial }: TestimonialFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Patient name</Label>
          <Input id="name" name="name" defaultValue={testimonial?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="e.g. Dubai, UAE" defaultValue={testimonial?.location} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="treatment">Treatment received</Label>
          <Input id="treatment" name="treatment" defaultValue={testimonial?.treatment} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hospital">Hospital</Label>
          <Input id="hospital" name="hospital" defaultValue={testimonial?.hospital} required />
        </div>
      </div>

      <ImageUploadField label="Patient photo" name="image" defaultValue={testimonial?.image} />

      <div className="space-y-2">
        <Label htmlFor="rating">Rating (1-5)</Label>
        <Input id="rating" name="rating" type="number" min="1" max="5" defaultValue={testimonial?.rating ?? 5} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="text">Testimonial text</Label>
        <Textarea id="text" name="text" rows={5} defaultValue={testimonial?.text} required />
      </div>

      <Button type="submit">{testimonial ? 'Save changes' : 'Add testimonial'}</Button>
    </form>
  )
}