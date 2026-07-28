import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface TagsTextareaProps {
  label: string
  name: string
  defaultValue?: string[]
  placeholder?: string
}

export function TagsTextarea({ label, name, defaultValue = [], placeholder }: TagsTextareaProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label} <span className="text-muted-foreground text-xs">(one per line)</span></Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue.join('\n')}
        placeholder={placeholder}
        rows={4}
      />
    </div>
  )
}