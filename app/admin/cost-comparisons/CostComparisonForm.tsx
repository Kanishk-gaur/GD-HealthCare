'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ICostComparison } from '@/lib/models/CostComparison'

interface CostComparisonFormProps {
  action: (formData: FormData) => void
  item?: ICostComparison
}

export function CostComparisonForm({ action, item }: CostComparisonFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="name">Procedure name</Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g. Heart Bypass Surgery"
          defaultValue={item?.name}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="usaCost">USA cost (USD)</Label>
          <Input
            id="usaCost"
            name="usaCost"
            type="number"
            min="0"
            placeholder="120000"
            defaultValue={item?.usaCost}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="indiaCost">India cost (USD)</Label>
          <Input
            id="indiaCost"
            name="indiaCost"
            type="number"
            min="0"
            placeholder="4700"
            defaultValue={item?.indiaCost}
            required
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        The savings percentage shown on the homepage is calculated from these two
        figures — you don&apos;t need to enter it.
      </p>

      <div className="space-y-2">
        <Label htmlFor="category">
          Category{' '}
          <span className="text-muted-foreground text-xs">(optional)</span>
        </Label>
        <Input
          id="category"
          name="category"
          placeholder="e.g. Cardiology"
          defaultValue={item?.category}
        />
      </div>

      <Button type="submit">{item ? 'Save changes' : 'Add procedure'}</Button>
    </form>
  )
}
