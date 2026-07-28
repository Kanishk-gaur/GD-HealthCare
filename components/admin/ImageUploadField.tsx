'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ImageUploadFieldProps {
  label: string
  name: string
  defaultValue?: string
}

export function ImageUploadField({ label, name, defaultValue = '' }: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Upload failed')
        return
      }

      setUrl(data.url)
    } catch {
      setError('Upload failed. Check your connection and try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <input type="hidden" name={name} value={url} />
      {url && (
        <div className="relative w-full max-w-xs h-40 rounded-md overflow-hidden border">
          <Image src={url} alt={label} fill className="object-cover" sizes="320px" />
        </div>
      )}
      <Input type="file" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
      {isUploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}