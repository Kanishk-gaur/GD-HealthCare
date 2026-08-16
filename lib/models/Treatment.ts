import { Schema, models, model } from 'mongoose'

export interface ITreatment {
  _id?: string
  slug: string
  name: string
  category: string
  thumbnailUrl: string
  startingCostINR: number
  startingCostUSD: number
  averageCostINR: number
  averageCostUSD: number
  recoveryTime: string
  hospitalStay: string
  successRate: string // kept as a string, e.g. "98%", to match existing display format
  // Stored as slugs (not free-text names) so relationships stay valid even if a
  // hospital/doctor name is edited later in the admin panel.
  recommendedHospitalSlugs: string[]
  recommendedDoctorSlugs: string[]
  description: string
  order: number
  createdAt?: Date
  updatedAt?: Date
}

const TreatmentSchema = new Schema<ITreatment>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    startingCostINR: { type: Number, required: true },
    startingCostUSD: { type: Number, required: true },
    averageCostINR: { type: Number, required: true },
    averageCostUSD: { type: Number, required: true },
    recoveryTime: { type: String, required: true },
    hospitalStay: { type: String, required: true },
    successRate: { type: String, required: true },
    recommendedHospitalSlugs: { type: [String], default: [] },
    recommendedDoctorSlugs: { type: [String], default: [] },
    description: { type: String, required: true },
    // Controls display order on the site (ascending). Defaults to 0; the
    // admin drag-and-drop reorder UI keeps this in sync with position.
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

export const Treatment =
  models.Treatment || model<ITreatment>('Treatment', TreatmentSchema)

export default Treatment