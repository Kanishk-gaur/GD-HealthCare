'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { TagsTextarea } from '@/components/admin/TagsTextarea'
import type { IDoctor } from '@/lib/models/Doctor'

interface DoctorFormProps {
  action: (formData: FormData) => void
  doctor?: IDoctor
  hospitalOptions: { slug: string; name: string }[]
}

export function DoctorForm({ action, doctor, hospitalOptions }: DoctorFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Doctor name</Label>
          <Input id="name" name="name" defaultValue={doctor?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">
            Slug <span className="text-muted-foreground text-xs">(leave blank to auto-generate)</span>
          </Label>
          <Input id="slug" name="slug" defaultValue={doctor?.slug} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Input id="specialization" name="specialization" defaultValue={doctor?.specialization} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subSpecialty">Sub-specialty</Label>
          <Input id="subSpecialty" name="subSpecialty" defaultValue={doctor?.subSpecialty} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hospitalSlug">Hospital</Label>
        <Select name="hospitalSlug" defaultValue={doctor?.hospitalSlug || undefined}>
          <SelectTrigger id="hospitalSlug" className="w-full">
            <SelectValue placeholder="Select a hospital" />
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

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input id="department" name="department" defaultValue={doctor?.department} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" defaultValue={doctor?.country} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={doctor?.city} />
        </div>
      </div>

      <ImageUploadField label="Photo" name="image" defaultValue={doctor?.image} />

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input id="rating" name="rating" type="number" step="0.1" min="0" max="5" defaultValue={doctor?.rating} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reviews">Reviews</Label>
          <Input id="reviews" name="reviews" type="number" min="0" defaultValue={doctor?.reviews} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Experience (years)</Label>
          <Input id="experience" name="experience" type="number" min="0" defaultValue={doctor?.experience} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="consultationFee">Consultation fee (USD)</Label>
          <Input id="consultationFee" name="consultationFee" type="number" min="0" defaultValue={doctor?.consultationFee} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qualification">Qualification</Label>
        <Input id="qualification" name="qualification" defaultValue={doctor?.qualification} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} defaultValue={doctor?.description} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="longBio">Long bio (for the detail page)</Label>
        <Textarea id="longBio" name="longBio" rows={6} defaultValue={doctor?.longBio} />
      </div>

      <TagsTextarea label="Languages" name="languages" defaultValue={doctor?.languages} />
      <TagsTextarea label="Expertise areas" name="expertiseAreas" defaultValue={doctor?.expertiseAreas} />
      <TagsTextarea label="Major procedures" name="majorProcedures" defaultValue={doctor?.majorProcedures} />
      <TagsTextarea label="Awards" name="awards" defaultValue={doctor?.awards} />
      <TagsTextarea label="Memberships" name="memberships" defaultValue={doctor?.memberships} />
      <TagsTextarea label="International experience" name="intlExperience" defaultValue={doctor?.intlExperience} />
      <TagsTextarea label="Recommended treatments" name="recommendedTreatments" defaultValue={doctor?.recommendedTreatments} />

      <Button type="submit">{doctor ? 'Save changes' : 'Create doctor'}</Button>
    </form>
  )
}