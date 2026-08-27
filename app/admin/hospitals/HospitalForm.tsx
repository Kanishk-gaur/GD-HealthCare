'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { TagsTextarea } from '@/components/admin/TagsTextarea'
import type { IHospital } from '@/lib/models/Hospital'

interface HospitalFormProps {
  action: (formData: FormData) => void
  hospital?: IHospital
}

export function HospitalForm({ action, hospital }: HospitalFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Hospital name</Label>
          <Input id="name" name="name" defaultValue={hospital?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">
            Slug <span className="text-muted-foreground text-xs">(leave blank to auto-generate from name)</span>
          </Label>
          <Input id="slug" name="slug" defaultValue={hospital?.slug} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" defaultValue={hospital?.country} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={hospital?.city} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" defaultValue={hospital?.address} />
        </div>
      </div>

      <ImageUploadField label="Hospital image" name="image" defaultValue={hospital?.image} />
      <ImageUploadField label="Logo" name="logoUrl" defaultValue={hospital?.logoUrl} />

      <div className="space-y-2">
        <Label htmlFor="websiteUrl">Website URL</Label>
        <Input id="websiteUrl" name="websiteUrl" defaultValue={hospital?.websiteUrl} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input id="rating" name="rating" type="number" step="0.1" min="0" max="5" defaultValue={hospital?.rating} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reviews">Reviews count</Label>
          <Input id="reviews" name="reviews" type="number" min="0" defaultValue={hospital?.reviews} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="beds">Beds</Label>
          <Input id="beds" name="beds" type="number" min="0" defaultValue={hospital?.beds} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="established">Established (year)</Label>
          <Input id="established" name="established" type="number" defaultValue={hospital?.established} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch id="icuAvailability" name="icuAvailability" defaultChecked={hospital?.icuAvailability} />
        <Label htmlFor="icuAvailability">ICU available</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={4} defaultValue={hospital?.description} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="blogDescription">Blog-style description (longer, for the detail page)</Label>
        <Textarea id="blogDescription" name="blogDescription" rows={6} defaultValue={hospital?.blogDescription} />
      </div>

      <TagsTextarea label="Specializations" name="specializations" defaultValue={hospital?.specializations} />
      <TagsTextarea label="Accreditations" name="accreditations" defaultValue={hospital?.accreditations} />
      <TagsTextarea label="International patient services" name="intlServices" defaultValue={hospital?.intlServices} />
      <TagsTextarea label="Departments" name="departments" defaultValue={hospital?.departments} />
      <TagsTextarea label="Centres of excellence" name="centresOfExcellence" defaultValue={hospital?.centresOfExcellence} />
      <TagsTextarea label="Treatments offered" name="treatmentsOffered" defaultValue={hospital?.treatmentsOffered} />

      <Button type="submit">{hospital ? 'Save changes' : 'Create hospital'}</Button>
    </form>
  )
}