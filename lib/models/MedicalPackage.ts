import { Schema, models, model } from 'mongoose'

export interface IMedicalPackage {
  _id?: string
  procedure: string
  // Free-form so new specialties can be added from the admin panel. The public
  // table shows a per-specialty icon for the known values and a generic one
  // otherwise (see getSpecialtyIcon in components/MedicalCostComparison.tsx).
  specialty: string
  hospital: string
  los: string // Length of stay, e.g. "1+5" (ICU days + ward days)
  icuDays: number
  wardDays: number
  economyPrice: number
  doublePrice: number
  singlePrice: number
  notes?: string
  includes: string[]
  createdAt?: Date
  updatedAt?: Date
}

const MedicalPackageSchema = new Schema<IMedicalPackage>(
  {
    procedure: { type: String, required: true },
    specialty: { type: String, required: true },
    hospital: { type: String, required: true },
    los: { type: String, default: '' },
    icuDays: { type: Number, default: 0 },
    wardDays: { type: Number, default: 0 },
    // All three room-type prices are in USD.
    economyPrice: { type: Number, required: true },
    doublePrice: { type: Number, required: true },
    singlePrice: { type: Number, required: true },
    notes: String,
    includes: { type: [String], default: [] },
  },
  { timestamps: true }
)

export const MedicalPackage =
  models.MedicalPackage ||
  model<IMedicalPackage>('MedicalPackage', MedicalPackageSchema)

export default MedicalPackage
