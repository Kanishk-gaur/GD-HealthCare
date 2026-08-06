import { Schema, models, model } from 'mongoose'

export interface ICostComparison {
  _id?: string
  name: string
  usaCost: number
  indiaCost: number
  category?: string
  createdAt?: Date
  updatedAt?: Date
}

const CostComparisonSchema = new Schema<ICostComparison>(
  {
    name: { type: String, required: true },
    // Both stored in USD — the public table formats them with Intl currency USD.
    usaCost: { type: Number, required: true },
    indiaCost: { type: Number, required: true },
    category: String,
  },
  { timestamps: true }
)

export const CostComparison =
  models.CostComparison ||
  model<ICostComparison>('CostComparison', CostComparisonSchema)

export default CostComparison
