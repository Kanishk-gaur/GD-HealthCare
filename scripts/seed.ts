/**
 * One-time migration script: reads the existing static arrays out of
 * lib/data.ts and inserts them into MongoDB.
 *
 * Run with:  npx tsx scripts/seed.ts
 *
 * Safe to re-run — it wipes and re-inserts each collection (see WIPE_FIRST).
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import {
  hospitals as rawHospitals,
  doctors as rawDoctors,
  MOCK_TREATMENTS as rawTreatments,
  testimonials as rawTestimonials,
  blogPosts as rawBlogPosts,
} from '../lib/data'
import Hospital from '../lib/models/Hospital'
import Doctor from '../lib/models/Doctor'
import Treatment from '../lib/models/Treatment'
import Testimonial from '../lib/models/Testimonial'
import BlogPost from '../lib/models/BlogPost'
import User from '../lib/models/User'

const WIPE_FIRST = true

// ---------------------------------------------------------------------------
// Helpers to fix the name-mismatch bugs found in the original data
// ---------------------------------------------------------------------------

function normalize(s: string): string {
  return s.replace(/,/g, '').toLowerCase().trim()
}

/** "Dr. Naresh Trehan (Cardiac Surgery)" -> "Dr. Naresh Trehan" */
function stripParenthetical(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*$/, '').trim()
}

const CITY_STOPWORDS = new Set([
  'new', 'delhi', 'gurugram', 'gurgaon', 'noida', 'india',
])

function significantWords(s: string): string[] {
  return normalize(s)
    .split(/\s+/)
    .filter((w) => w.length > 3 && !CITY_STOPWORDS.has(w))
}

function findHospitalSlugByFuzzyName(
  fuzzyName: string,
  hospitalList: typeof rawHospitals
): string | null {
  const cleanedFuzzy = normalize(fuzzyName)

  for (const h of hospitalList) {
    const cleanedReal = normalize(h.name)
    if (
      cleanedReal === cleanedFuzzy ||
      cleanedReal.includes(cleanedFuzzy) ||
      cleanedFuzzy.includes(cleanedReal)
    ) {
      return h.slug
    }
    const abbrMatch = h.name.match(/\(([^)]+)\)/)
    if (abbrMatch && cleanedFuzzy.includes(abbrMatch[1].toLowerCase())) {
      return h.slug
    }
  }

  const fuzzyWords = significantWords(fuzzyName)
  if (fuzzyWords.length === 0) return null
  for (const h of hospitalList) {
    const realNorm = normalize(h.name)
    const matchedCount = fuzzyWords.filter((w) => realNorm.includes(w)).length
    if (matchedCount / fuzzyWords.length >= 0.75) return h.slug
  }
  return null
}

function findDoctorSlugByFuzzyName(
  fuzzyName: string,
  doctorList: typeof rawDoctors
): string | null {
  const cleaned = stripParenthetical(fuzzyName).toLowerCase()
  const match = doctorList.find((d) => d.name.toLowerCase() === cleaned)
  return match ? match.slug : null
}

const TESTIMONIAL_HOSPITAL_FIX: Record<string, string> = {
  'Max Healthcare Bangalore': 'Max Super Speciality Hospital, Saket',
  'Apollo Hospital Delhi': 'Indraprastha Apollo Hospital',
  'American Hospital Dubai': 'Medanta – The Medicity',
  'Fortis Hospital Hyderabad': 'Fortis Memorial Research Institute (FMRI)',
}

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local first.')
  }

  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)

  if (WIPE_FIRST) {
    console.log('Wiping existing collections...')
    await Promise.all([
      Hospital.deleteMany({}),
      Doctor.deleteMany({}),
      Treatment.deleteMany({}),
      Testimonial.deleteMany({}),
      BlogPost.deleteMany({}),
    ])
  }

  console.log(`Seeding ${rawHospitals.length} hospitals...`)
  await Hospital.insertMany(
    rawHospitals.map((h) => ({
      slug: h.slug, name: h.name, country: h.country, city: h.city,
      address: h.address, image: h.image, logoUrl: h.logoUrl,
      websiteUrl: h.websiteUrl, rating: h.rating, reviews: h.reviews,
      description: h.description, blogDescription: h.blogDescription,
      beds: h.beds, established: h.established,
      specializations: h.specializations, accreditations: h.accreditations,
      avgCost: h.avgCost, icuAvailability: h.icuAvailability,
      intlServices: h.intlServices, departments: h.departments,
      centresOfExcellence: h.centresOfExcellence,
      treatmentsOffered: h.treatmentsOffered,
    }))
  )

  console.log(`Seeding ${rawDoctors.length} doctors...`)
  await Doctor.insertMany(
    rawDoctors.map((d) => ({
      slug: d.slug, name: d.name, specialization: d.specialization,
      subSpecialty: d.subSpecialty, hospital: d.hospital,
      hospitalSlug: findHospitalSlugByFuzzyName(d.hospital, rawHospitals) ?? undefined,
      department: d.department, country: d.country, city: d.city,
      image: d.image, rating: d.rating, reviews: d.reviews,
      experience: d.experience, qualification: d.qualification,
      languages: d.languages, consultationFee: d.consultationFee,
      description: d.description, longBio: d.longBio,
      expertiseAreas: d.expertiseAreas, majorProcedures: d.majorProcedures,
      awards: d.awards, memberships: d.memberships,
      intlExperience: d.intlExperience,
      recommendedTreatments: d.recommendedTreatments,
    }))
  )

  console.log(`Seeding ${rawTreatments.length} treatments...`)
  let unmatchedHospitalRefs = 0
  let unmatchedDoctorRefs = 0

  await Treatment.insertMany(
    rawTreatments.map((t) => {
      const hospitalSlugs = t.recommendedHospitals
        .map((name) => findHospitalSlugByFuzzyName(name, rawHospitals))
        .filter((slug): slug is string => {
          if (!slug) unmatchedHospitalRefs++
          return Boolean(slug)
        })

      const doctorSlugs = t.recommendedDoctors
        .map((name) => findDoctorSlugByFuzzyName(name, rawDoctors))
        .filter((slug): slug is string => {
          if (!slug) unmatchedDoctorRefs++
          return Boolean(slug)
        })

      return {
        slug: t.slug, name: t.name, category: t.category,
        thumbnailUrl: t.thumbnailUrl, startingCostINR: t.startingCostINR,
        startingCostUSD: t.startingCostUSD, averageCostINR: t.averageCostINR,
        averageCostUSD: t.averageCostUSD, recoveryTime: t.recoveryTime,
        hospitalStay: t.hospitalStay, successRate: t.successRate,
        recommendedHospitalSlugs: hospitalSlugs,
        recommendedDoctorSlugs: doctorSlugs, description: t.description,
      }
    })
  )

  if (unmatchedHospitalRefs || unmatchedDoctorRefs) {
    console.warn(
      `  Note: ${unmatchedHospitalRefs} hospital reference(s) and ${unmatchedDoctorRefs} doctor reference(s) inside treatments could not be matched and were dropped. Re-link these manually in the admin panel.`
    )
  }

  console.log(`Seeding ${rawTestimonials.length} testimonials...`)
  await Testimonial.insertMany(
    rawTestimonials.map((t) => ({
      name: t.name, location: t.location, treatment: t.treatment,
      hospital: TESTIMONIAL_HOSPITAL_FIX[t.hospital] ?? t.hospital,
      image: t.image, text: t.text, rating: t.rating,
    }))
  )

  console.log(`Seeding ${rawBlogPosts.length} blog posts...`)
  await BlogPost.insertMany(
    rawBlogPosts.map((b) => ({
      slug: b.slug, title: b.title, author: b.author, date: new Date(b.date),
      image: b.image, excerpt: b.excerpt, category: b.category,
      content: `${b.excerpt}\n\n[TODO: replace this placeholder with real article content via the admin panel]`,
      published: true,
    }))
  )

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (adminEmail && adminPassword) {
    const existing = await User.findOne({ email: adminEmail.toLowerCase() })
    if (!existing) {
      console.log(`Creating initial admin user (${adminEmail})...`)
      const passwordHash = await bcrypt.hash(adminPassword, 10)
      await User.create({
        email: adminEmail.toLowerCase(), passwordHash, name: 'Admin', role: 'admin',
      })
    } else {
      console.log('Admin user already exists, skipping.')
    }
  } else {
    console.warn(
      '  Note: ADMIN_EMAIL / ADMIN_PASSWORD not set — no admin user was created.'
    )
  }

  console.log('Seed complete.')
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})