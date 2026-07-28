import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import cloudinary from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

  try {
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'gdhealthcare',
    })
    return NextResponse.json({ url: result.secure_url })
  } catch (err) {
    console.error('Cloudinary upload failed:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}