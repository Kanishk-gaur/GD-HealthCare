import { Schema, models, model } from 'mongoose'

export interface ICountry {
  _id?: string
  slug: string
  name: string
  // Emoji flag, e.g. "🇷🇺" — shown next to the name on the /countries page.
  flag: string
  // Groups countries into sections on the /countries page, e.g. "Middle East".
  // Free text — a new value forms a new section automatically.
  region: string
  patients: number
  popularTreatments: string[]
  order: number
  createdAt?: Date
  updatedAt?: Date
}

const CountrySchema = new Schema<ICountry>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    flag: { type: String, required: true },
    region: { type: String, required: true, index: true },
    patients: { type: Number, default: 0 },
    popularTreatments: { type: [String], default: [] },
    // Controls display order on the site (ascending). Defaults to 0; the
    // admin drag-and-drop reorder UI keeps this in sync with position.
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)

export const Country = models.Country || model<ICountry>('Country', CountrySchema)

export default Country
