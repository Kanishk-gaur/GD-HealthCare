import { Schema, models, model } from 'mongoose'

export interface IFAQ {
  _id?: string
  question: string
  answer: string
  order: number
  createdAt?: Date
  updatedAt?: Date
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    // Controls display order on the site (ascending). Defaults to the
    // current count so new entries land at the end of the list.
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

export const FAQ = models.FAQ || model<IFAQ>('FAQ', FAQSchema)

export default FAQ
