'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface MultiSelectCheckboxesProps {
  label: string
  name: string
  options: { value: string; label: string }[]
  defaultValue?: string[]
}

export function MultiSelectCheckboxes({
  label,
  name,
  options,
  defaultValue = [],
}: MultiSelectCheckboxesProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue)

  function toggle(value: string, checked: boolean) {
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    )
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border rounded-md p-3 max-h-56 overflow-y-auto space-y-2">
        {options.length === 0 && (
          <p className="text-sm text-muted-foreground">No options available yet.</p>
        )}
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center gap-2">
            <Checkbox
              id={`${name}-${opt.value}`}
              checked={selected.includes(opt.value)}
              onCheckedChange={(checked) => toggle(opt.value, checked === true)}
            />
            <label htmlFor={`${name}-${opt.value}`} className="text-sm cursor-pointer">
              {opt.label}
            </label>
          </div>
        ))}
      </div>
      {selected.map((value) => (
        <input key={value} type="hidden" name={name} value={value} />
      ))}
    </div>
  )
}