import { Schema, models, model } from 'mongoose'

export interface ITestimonial {
  _id?: string
  name: string
  location: string
  treatment: string
  hospital: string
  image: string
  text: string
  rating: number
  createdAt?: Date
  updatedAt?: Date
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    treatment: { type: String, required: true },
    hospital: { type: String, required: true },
    image: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
  },
  { timestamps: true }
)

export const Testimonial =
  models.Testimonial || model<ITestimonial>('Testimonial', TestimonialSchema)

export default Testimonial