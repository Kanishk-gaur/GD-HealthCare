'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImageUploadField } from '@/components/admin/ImageUploadField'
import { MultiSelectCheckboxes } from '@/components/admin/MultiSelectCheckboxes'
import type { ITreatment } from '@/lib/models/Treatment'

interface TreatmentFormProps {
  action: (formData: FormData) => void
  treatment?: ITreatment
  hospitalOptions: { slug: string; name: string }[]
  doctorOptions: { slug: string; name: string }[]
}

export function TreatmentForm({ action, treatment, hospitalOptions, doctorOptions }: TreatmentFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Treatment name</Label>
          <Input id="name" name="name" defaultValue={treatment?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">
            Slug <span className="text-muted-foreground text-xs">(leave blank to auto-generate)</span>
          </Label>
          <Input id="slug" name="slug" defaultValue={treatment?.slug} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" defaultValue={treatment?.category} required />
      </div>

      <ImageUploadField label="Thumbnail" name="thumbnailUrl" defaultValue={treatment?.thumbnailUrl} />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startingCostINR">Starting cost (INR)</Label>
          <Input id="startingCostINR" name="startingCostINR" type="number" min="0" defaultValue={treatment?.startingCostINR} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startingCostUSD">Starting cost (USD)</Label>
          <Input id="startingCostUSD" name="startingCostUSD" type="number" min="0" defaultValue={treatment?.startingCostUSD} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="averageCostINR">Average cost (INR)</Label>
          <Input id="averageCostINR" name="averageCostINR" type="number" min="0" defaultValue={treatment?.averageCostINR} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="averageCostUSD">Average cost (USD)</Label>
          <Input id="averageCostUSD" name="averageCostUSD" type="number" min="0" defaultValue={treatment?.averageCostUSD} required />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="recoveryTime">Recovery time</Label>
          <Input id="recoveryTime" name="recoveryTime" placeholder="e.g. 4-6 weeks" defaultValue={treatment?.recoveryTime} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hospitalStay">Hospital stay</Label>
          <Input id="hospitalStay" name="hospitalStay" placeholder="e.g. 3-5 days" defaultValue={treatment?.hospitalStay} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="successRate">Success rate</Label>
          <Input id="successRate" name="successRate" placeholder="e.g. 98%" defaultValue={treatment?.successRate} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={5} defaultValue={treatment?.description} required />
      </div>

      <MultiSelectCheckboxes
        label="Recommended hospitals"
        name="recommendedHospitalSlugs"
        options={hospitalOptions.map((h) => ({ value: h.slug, label: h.name }))}
        defaultValue={treatment?.recommendedHospitalSlugs}
      />

      <MultiSelectCheckboxes
        label="Recommended doctors"
        name="recommendedDoctorSlugs"
        options={doctorOptions.map((d) => ({ value: d.slug, label: d.name }))}
        defaultValue={treatment?.recommendedDoctorSlugs}
      />

      <Button type="submit">{treatment ? 'Save changes' : 'Create treatment'}</Button>
    </form>
  )
}