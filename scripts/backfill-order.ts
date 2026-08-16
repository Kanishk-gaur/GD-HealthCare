/**
 * One-time migration: assigns a sequential `order` value to every existing
 * document across the entities that just gained admin drag-and-drop
 * reordering, using each entity's previous default sort as the starting
 * order — so nothing visually moves on the site until an admin drags a row.
 *
 * Run with:  npx tsx scripts/backfill-order.ts
 *
 * Safe to re-run — it always re-derives order from the same baseline sort.
 */
import 'dotenv/config'
import mongoose, { type Model } from 'mongoose'
import Hospital from '../lib/models/Hospital'
import Treatment from '../lib/models/Treatment'
import Doctor from '../lib/models/Doctor'
import PatientTestimonial from '../lib/models/PatientTestimonial'
import MedicalPackage from '../lib/models/MedicalPackage'
import CostComparison from '../lib/models/CostComparison'

async function backfill(model: Model<any>, baselineSort: Record<string, 1 | -1>, label: string) {
  const docs = await model.find().sort(baselineSort).select('_id').lean<{ _id: mongoose.Types.ObjectId }[]>()
  if (docs.length === 0) {
    console.log(`${label}: no documents, skipping.`)
    return
  }
  await model.bulkWrite(
    docs.map((doc, index) => ({
      updateOne: { filter: { _id: doc._id }, update: { $set: { order: index } } },
    }))
  )
  console.log(`${label}: backfilled order on ${docs.length} documents.`)
}

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local first.')
  }

  await mongoose.connect(MONGODB_URI)

  await backfill(Hospital, { name: 1 }, 'Hospitals')
  await backfill(Treatment, { name: 1 }, 'Treatments')
  await backfill(Doctor, { name: 1 }, 'Doctors')
  await backfill(PatientTestimonial, { date: -1 }, 'Patient testimonials')
  await backfill(MedicalPackage, { hospital: 1, procedure: 1 }, 'Medical packages')
  await backfill(CostComparison, { name: 1 }, 'Cost comparisons')

  console.log('Backfill complete.')
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Backfill failed:', err)
  process.exit(1)
})
