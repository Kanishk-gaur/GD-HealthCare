/**
 * One-time migration: moves the "where our patients come from" data that used
 * to be hardcoded in app/(site)/countries/CountriesClient.tsx into MongoDB,
 * now that Countries has its own admin CRUD (add/edit/delete/reorder).
 *
 * Run with:  npx tsx scripts/seed-countries.ts
 *
 * Wipes and re-inserts the Country collection — safe to re-run, but any
 * countries added/edited by hand in the admin panel since the last run will
 * be overwritten by this static list.
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import Country from '../lib/models/Country'
import { toSlug } from '../lib/admin-utils'

const regions = [
  {
    name: 'CIS Countries',
    countries: [
      { name: 'Russia', flag: '🇷🇺', patients: 1250, popular: ['Cardiology', 'Oncology'] },
      { name: 'Ukraine', flag: '🇺🇦', patients: 850, popular: ['Orthopedics', 'Neurology'] },
      { name: 'Kazakhstan', flag: '🇰🇿', patients: 720, popular: ['Cardiology', 'Nephrology'] },
      { name: 'Uzbekistan', flag: '🇺🇿', patients: 580, popular: ['Gynecology', 'Urology'] },
      { name: 'Azerbaijan', flag: '🇦🇿', patients: 420, popular: ['Ophthalmology', 'Dental'] },
    ],
  },
  {
    name: 'Pacific Region',
    countries: [
      { name: 'Australia', flag: '🇦🇺', patients: 980, popular: ['Cosmetic Surgery', 'Dental'] },
      { name: 'New Zealand', flag: '🇳🇿', patients: 650, popular: ['Orthopedics', 'Cardiology'] },
      { name: 'Fiji', flag: '🇫🇯', patients: 180, popular: ['General Surgery', 'Gynecology'] },
      { name: 'Papua New Guinea', flag: '🇵🇬', patients: 120, popular: ['Cardiology', 'Pediatrics'] },
    ],
  },
  {
    name: 'Middle East',
    countries: [
      { name: 'UAE', flag: '🇦🇪', patients: 2100, popular: ['Cardiology', 'Oncology', 'Orthopedics'] },
      { name: 'Saudi Arabia', flag: '🇸🇦', patients: 1850, popular: ['Cardiology', 'Neurology'] },
      { name: 'Kuwait', flag: '🇰🇼', patients: 1200, popular: ['Oncology', 'Nephrology'] },
      { name: 'Qatar', flag: '🇶🇦', patients: 980, popular: ['Orthopedics', 'Ophthalmology'] },
      { name: 'Oman', flag: '🇴🇲', patients: 750, popular: ['Cardiology', 'Gynecology'] },
      { name: 'Bahrain', flag: '🇧🇭', patients: 520, popular: ['Dental', 'Cosmetic Surgery'] },
    ],
  },
  {
    name: 'Africa',
    countries: [
      { name: 'Kenya', flag: '🇰🇪', patients: 680, popular: ['Cardiology', 'Oncology'] },
      { name: 'Nigeria', flag: '🇳🇬', patients: 920, popular: ['Orthopedics', 'Neurology'] },
      { name: 'South Africa', flag: '🇿🇦', patients: 550, popular: ['Cardiology', 'Cosmetic Surgery'] },
      { name: 'Ethiopia', flag: '🇪🇹', patients: 380, popular: ['Gynecology', 'Pediatrics'] },
      { name: 'Ghana', flag: '🇬🇭', patients: 310, popular: ['General Surgery', 'Urology'] },
      { name: 'Tanzania', flag: '🇹🇿', patients: 250, popular: ['Cardiology', 'Ophthalmology'] },
    ],
  },
  {
    name: 'Europe',
    countries: [
      { name: 'United Kingdom', flag: '🇬🇧', patients: 1600, popular: ['Cosmetic Surgery', 'Dental', 'Orthopedics'] },
      { name: 'Germany', flag: '🇩🇪', patients: 850, popular: ['Cardiology', 'Oncology'] },
      { name: 'France', flag: '🇫🇷', patients: 720, popular: ['Orthopedics', 'Neurology'] },
      { name: 'Italy', flag: '🇮🇹', patients: 580, popular: ['Cosmetic Surgery', 'Dental'] },
      { name: 'Spain', flag: '🇪🇸', patients: 490, popular: ['Cardiology', 'Ophthalmology'] },
      { name: 'Netherlands', flag: '🇳🇱', patients: 420, popular: ['Orthopedics', 'Gynecology'] },
      { name: 'Sweden', flag: '🇸🇪', patients: 380, popular: ['Neurology', 'Cardiology'] },
    ],
  },
]

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local first.')
  }

  await mongoose.connect(MONGODB_URI)

  await Country.deleteMany({})

  let order = 0
  for (const region of regions) {
    for (const c of region.countries) {
      await Country.create({
        slug: toSlug(c.name),
        name: c.name,
        flag: c.flag,
        region: region.name,
        patients: c.patients,
        popularTreatments: c.popular,
        order: order++,
      })
    }
  }

  console.log(`Seeded ${order} countries across ${regions.length} regions.`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
