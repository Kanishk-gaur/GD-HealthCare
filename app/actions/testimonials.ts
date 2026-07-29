'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongodb'
import Testimonial from '@/lib/models/Testimonial'

function buildTestimonialData(formData: FormData) {
  return {
    name: String(formData.get('name') || ''),
    location: String(formData.get('location') || ''),
    treatment: String(formData.get('treatment') || ''),
    hospital: String(formData.get('hospital') || ''),
    image: String(formData.get('image') || ''),
    text: String(formData.get('text') || ''),
    rating: Number(formData.get('rating') || 5),
  }
}

export async function createTestimonial(formData: FormData) {
  await connectToDatabase()
  const data = buildTestimonialData(formData)
  await Testimonial.create(data)
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  redirect('/admin/testimonials')
}

export async function updateTestimonial(id: string, formData: FormData) {
  await connectToDatabase()
  const data = buildTestimonialData(formData)
  await Testimonial.findByIdAndUpdate(id, data)
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  redirect('/admin/testimonials')
}

export async function deleteTestimonial(id: string) {
  await connectToDatabase()
  await Testimonial.findByIdAndDelete(id)
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}