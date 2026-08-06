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
import { TagsTextarea } from '@/components/admin/TagsTextarea'
import type { IMedicalPackage } from '@/lib/models/MedicalPackage'

// These match the specialties the public table has icons for. Anything else
// still works, it just falls back to a generic icon.
const SPECIALTIES = [
  'Cardiac',
  'Neuro-Spine',
  'Orthopedics',
  'General Surgery',
  'Other',
]

interface MedicalPackageFormProps {
  action: (formData: FormData) => void
  pkg?: IMedicalPackage
  hospitalOptions: string[]
}

export function MedicalPackageForm({
  action,
  pkg,
  hospitalOptions,
}: MedicalPackageFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="space-y-2">
        <Label htmlFor="procedure">Procedure name</Label>
        <Input
          id="procedure"
          name="procedure"
          placeholder="e.g. TKR - Total Knee Replacement U/L"
          defaultValue={pkg?.procedure}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="specialty">Specialty</Label>
          <Select name="specialty" defaultValue={pkg?.specialty || undefined} required>
            <SelectTrigger id="specialty" className="w-full">
              <SelectValue placeholder="Select a specialty" />
            </SelectTrigger>
            <SelectContent>
              {SPECIALTIES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hospital">Hospital</Label>
          <Input
            id="hospital"
            name="hospital"
            list="package-hospitals"
            placeholder="e.g. Max Healthcare"
            defaultValue={pkg?.hospital}
            required
          />
          <datalist id="package-hospitals">
            {hospitalOptions.map((h) => (
              <option key={h} value={h} />
            ))}
          </datalist>
          <p className="text-xs text-muted-foreground">
            Free text — this becomes a filter option on the homepage table. Pick an
            existing name from the list to group packages together.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icuDays">ICU days</Label>
          <Input
            id="icuDays"
            name="icuDays"
            type="number"
            min="0"
            defaultValue={pkg?.icuDays ?? 0}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wardDays">Ward days</Label>
          <Input
            id="wardDays"
            name="wardDays"
            type="number"
            min="0"
            defaultValue={pkg?.wardDays ?? 0}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="los">
            Length of stay{' '}
            <span className="text-muted-foreground text-xs">(auto: ICU+ward)</span>
          </Label>
          <Input id="los" name="los" placeholder="1+5" defaultValue={pkg?.los} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="economyPrice">Economy room (USD)</Label>
          <Input
            id="economyPrice"
            name="economyPrice"
            type="number"
            min="0"
            defaultValue={pkg?.economyPrice}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="doublePrice">Double room (USD)</Label>
          <Input
            id="doublePrice"
            name="doublePrice"
            type="number"
            min="0"
            defaultValue={pkg?.doublePrice}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="singlePrice">Single room (USD)</Label>
          <Input
            id="singlePrice"
            name="singlePrice"
            type="number"
            min="0"
            defaultValue={pkg?.singlePrice}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">
          Notes{' '}
          <span className="text-muted-foreground text-xs">
            (shown under the procedure name on the homepage)
          </span>
        </Label>
        <Textarea
          id="notes"
          name="notes"
          rows={2}
          placeholder="e.g. With implant - US FDA Approved"
          defaultValue={pkg?.notes}
        />
      </div>

      <TagsTextarea
        label="Package includes"
        name="includes"
        defaultValue={pkg?.includes}
        placeholder="Surgeon fees&#10;Anaesthesia"
      />

      <Button type="submit">{pkg ? 'Save changes' : 'Create package'}</Button>
    </form>
  )
}
