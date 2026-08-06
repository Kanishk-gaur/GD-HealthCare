'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { IFAQ } from '@/lib/models/FAQ'

interface FAQFormProps {
  action: (formData: FormData) => void
  faq?: IFAQ
  nextOrder: number
}

export function FAQForm({ action, faq, nextOrder }: FAQFormProps) {
  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          name="question"
          placeholder="e.g. Is medical tourism safe?"
          defaultValue={faq?.question}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="answer">Answer</Label>
        <Textarea id="answer" name="answer" rows={4} defaultValue={faq?.answer} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="order">
          Display order{' '}
          <span className="text-muted-foreground text-xs">(lower numbers show first)</span>
        </Label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={faq?.order ?? nextOrder}
          required
        />
      </div>

      <Button type="submit">{faq ? 'Save changes' : 'Add question'}</Button>
    </form>
  )
}
