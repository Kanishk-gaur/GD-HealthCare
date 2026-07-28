import { Schema, models, model } from 'mongoose'

export interface IDoctor {
  _id?: string
  slug: string
  name: string
  specialization: string
  subSpecialty?: string
  hospital: string // hospital name (kept as string to match existing display logic)
  hospitalSlug?: string // reference to Hospital.slug for reliable linking
  department?: string
  country: string
  city?: string
  image: string
  rating: number
  reviews: number
  experience: number
  qualification: string
  languages: string[]
  consultationFee: number
  description: string
  longBio?: string
  expertiseAreas: string[]
  majorProcedures: string[]
  awards: string[]
  memberships: string[]
  intlExperience: string[]
  recommendedTreatments: string[]
  createdAt?: Date
  updatedAt?: Date
}

const DoctorSchema = new Schema<IDoctor>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    subSpecialty: String,
    hospital: { type: String, required: true },
    hospitalSlug: { type: String, index: true },
    department: String,
    country: { type: String, required: true },
    city: String,
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    qualification: { type: String, required: true },
    languages: { type: [String], default: [] },
    consultationFee: { type: Number, default: 0 },
    description: { type: String, required: true },
    longBio: String,
    expertiseAreas: { type: [String], default: [] },
    majorProcedures: { type: [String], default: [] },
    awards: { type: [String], default: [] },
    memberships: { type: [String], default: [] },
    intlExperience: { type: [String], default: [] },
    recommendedTreatments: { type: [String], default: [] },
  },
  { timestamps: true }
)

export const Doctor = models.Doctor || model<IDoctor>('Doctor', DoctorSchema)

export default Doctor