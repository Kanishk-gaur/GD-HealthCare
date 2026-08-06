/**
 * Additive seed for the two homepage cost tables only.
 *
 * Run with:  npx tsx scripts/seed-cost-tables.ts
 *
 * Unlike scripts/seed.ts (which wipes every collection), this touches ONLY the
 * costcomparisons and medicalpackages collections, and skips any that already
 * hold documents — so it is safe to run against a live database.
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import { costData as rawCostComparisons } from '../app/(site)/HomeClient'
import { allPackages as rawMedicalPackages } from '../components/MedicalCostComparison'
import CostComparison from '../lib/models/CostComparison'
import MedicalPackage from '../lib/models/MedicalPackage'

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local first.')
  }

  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)

  const existingCosts = await CostComparison.countDocuments()
  if (existingCosts > 0) {
    console.log(
      `Skipping cost comparison — ${existingCosts} row(s) already exist. Delete them in the admin panel first if you want to re-import.`
    )
  } else {
    console.log(`Seeding ${rawCostComparisons.length} cost comparison rows...`)
    await CostComparison.insertMany(
      rawCostComparisons.map((c) => ({
        name: c.name,
        usaCost: c.usaCost,
        indiaCost: c.indiaCost,
        category: c.category,
      }))
    )
  }

  const existingPackages = await MedicalPackage.countDocuments()
  if (existingPackages > 0) {
    console.log(
      `Skipping procedure packages — ${existingPackages} package(s) already exist.`
    )
  } else {
    console.log(`Seeding ${rawMedicalPackages.length} procedure packages...`)
    await MedicalPackage.insertMany(
      rawMedicalPackages.map((p) => ({
        procedure: p.procedure,
        specialty: p.specialty,
        hospital: p.hospital,
        los: p.los,
        icuDays: p.icuDays,
        wardDays: p.wardDays,
        economyPrice: p.economyPrice,
        doublePrice: p.doublePrice,
        singlePrice: p.singlePrice,
        notes: p.notes,
        includes: p.includes ?? [],
      }))
    )
  }

  console.log('Done.')
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
