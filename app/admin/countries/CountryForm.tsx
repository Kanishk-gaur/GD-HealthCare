'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TagsTextarea } from '@/components/admin/TagsTextarea'
import type { ICountry } from '@/lib/models/Country'

interface CountryFormProps {
  action: (formData: FormData) => void
  country?: ICountry
}

export function CountryForm({ action, country }: CountryFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Country name</Label>
          <Input id="name" name="name" defaultValue={country?.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="flag">
            Flag <span className="text-muted-foreground text-xs">(emoji, e.g. 🇷🇺)</span>
          </Label>
          <Input id="flag" name="flag" defaultValue={country?.flag} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">
            Slug <span className="text-muted-foreground text-xs">(leave blank to auto-generate)</span>
          </Label>
          <Input id="slug" name="slug" defaultValue={country?.slug} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="region">
            Region <span className="text-muted-foreground text-xs">(section it's grouped under, e.g. Middle East)</span>
          </Label>
          <Input id="region" name="region" defaultValue={country?.region} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patients">Patients served</Label>
          <Input id="patients" name="patients" type="number" min="0" defaultValue={country?.patients} />
        </div>
      </div>

      <TagsTextarea
        label="Popular treatments"
        name="popularTreatments"
        defaultValue={country?.popularTreatments}
      />

      <Button type="submit">{country ? 'Save changes' : 'Create country'}</Button>
    </form>
  )
}
