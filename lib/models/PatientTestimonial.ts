import { Schema, models, model } from 'mongoose'

export interface IPatientTestimonial {
  _id?: string
  slug: string
  title: string
  author: string
  date: Date
  image: string
  excerpt: string
  category: string
  content: string
  published: boolean
  patientName: string
  patientAge: number
  patientGender: string
  patientCountry: string
  treatment: string
  hospital: string
  // References resolved at render time so linked profiles always reflect
  // current details. Optional — the free-text name above is still shown
  // when a post doesn't (or can't) link to a matching record.
  doctorSlug?: string
  hospitalSlug?: string
  treatmentSlug?: string
  youtubeUrl?: string
  order: number
  createdAt?: Date
  updatedAt?: Date
}

const PatientTestimonialSchema = new Schema<IPatientTestimonial>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    image: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, default: true },
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    patientGender: { type: String, required: true },
    patientCountry: { type: String, required: true },
    treatment: { type: String, required: true },
    hospital: { type: String, required: true },
    doctorSlug: { type: String, index: true },
    hospitalSlug: { type: String, index: true },
    treatmentSlug: { type: String, index: true },
    youtubeUrl: String,
    // Controls display order on the site (ascending). Defaults to 0; the
    // admin drag-and-drop reorder UI keeps this in sync with position.
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

// Explicit collection name keeps this pointed at the pre-existing
// "blogposts" collection — this model was renamed from BlogPost, and the
// data (and its Mongo _ids/URLs already referenced elsewhere) must not move.
export const PatientTestimonial =
  models.PatientTestimonial ||
  model<IPatientTestimonial>('PatientTestimonial', PatientTestimonialSchema, 'blogposts')

export default PatientTestimonial
