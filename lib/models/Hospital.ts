import mongoose, { Schema, models, model } from 'mongoose'

export interface IHospital {
  _id?: string
  slug: string
  name: string
  country: string
  city?: string
  address?: string
  image: string
  logoUrl?: string
  websiteUrl?: string
  rating: number
  reviews: number
  description: string
  blogDescription?: string
  beds: number
  established?: number
  specializations: string[]
  accreditations: string[]
  icuAvailability: boolean
  intlServices: string[]
  departments: string[]
  centresOfExcellence: string[]
  treatmentsOffered: string[]
  order: number
  createdAt?: Date
  updatedAt?: Date
}

const HospitalSchema = new Schema<IHospital>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: String,
    address: String,
    image: { type: String, required: true },
    logoUrl: String,
    websiteUrl: String,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    description: { type: String, required: true },
    blogDescription: String,
    beds: { type: Number, default: 0 },
    established: Number,
    specializations: { type: [String], default: [] },
    accreditations: { type: [String], default: [] },
    icuAvailability: { type: Boolean, default: false },
    intlServices: { type: [String], default: [] },
    departments: { type: [String], default: [] },
    centresOfExcellence: { type: [String], default: [] },
    treatmentsOffered: { type: [String], default: [] },
    // Controls display order on the site (ascending). Defaults to 0; the
    // admin drag-and-drop reorder UI keeps this in sync with position.
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

// Prevents "Cannot overwrite model" errors during Next.js hot reload
export const Hospital =
  models.Hospital || model<IHospital>('Hospital', HospitalSchema)

export default Hospital