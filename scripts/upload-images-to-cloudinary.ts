/**
 * One-time migration: uploads the local hospital/doctor/treatment images in
 * public/ to Cloudinary, then rewrites the matching MongoDB documents'
 * image / thumbnailUrl fields from the local "/hospital/..." style path to
 * the returned Cloudinary secure_url.
 *
 * Only touches documents whose field still points at a local /public path
 * (skips ones already migrated, e.g. images added later via the admin panel).
 *
 * Run with:  npx tsx scripts/upload-images-to-cloudinary.ts
 */
import 'dotenv/config'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { execFileSync } from 'child_process'
import mongoose from 'mongoose'
import cloudinary from '../lib/cloudinary'
import Hospital from '../lib/models/Hospital'
import Doctor from '../lib/models/Doctor'
import Treatment from '../lib/models/Treatment'

const MAX_BYTES = 9.5 * 1024 * 1024

// Some source photos are huge uncompressed PNG screenshots (10-17MB) that
// exceed Cloudinary's per-file limit. Downscale + re-encode as JPEG via
// ffmpeg into a temp file before uploading; original on disk is untouched.
function shrinkIfNeeded(absolutePath: string): string {
  if (fs.statSync(absolutePath).size <= MAX_BYTES) return absolutePath

  const tmpOut = path.join(os.tmpdir(), `${path.basename(absolutePath, path.extname(absolutePath))}.shrunk.jpg`)
  execFileSync('ffmpeg', [
    '-y',
    '-i', absolutePath,
    '-vf', "scale='min(1600,iw)':-2",
    '-q:v', '4',
    tmpOut,
  ])
  return tmpOut
}

const TARGETS = [
  { Model: Hospital, field: 'image', prefix: '/hospital/' },
  { Model: Doctor, field: 'image', prefix: '/doctors/' },
  { Model: Treatment, field: 'thumbnailUrl', prefix: '/treatment/' },
] as const

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not set. Add it to .env.local first.')

  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB.')

  // Cache: local path -> uploaded secure_url, so the same file is uploaded once
  // even if several documents share it (e.g. two treatments reusing one image).
  const uploadCache = new Map<string, string>()

  let uploaded = 0
  let updated = 0
  let skipped = 0

  for (const { Model, field, prefix } of TARGETS) {
    const docs = await Model.find({
      [field]: { $regex: `^${prefix}` },
    })

    for (const doc of docs) {
      const localPath: string = (doc as any)[field]

      let secureUrl = uploadCache.get(localPath)
      if (!secureUrl) {
        const absolutePath = path.join(process.cwd(), 'public', localPath)
        try {
          const uploadPath = shrinkIfNeeded(absolutePath)
          const result = await cloudinary.uploader.upload(uploadPath, {
            folder: 'gdhealthcare',
          })
          secureUrl = result.secure_url
          uploadCache.set(localPath, secureUrl)
          uploaded++
          console.log(`Uploaded ${localPath} -> ${secureUrl}`)
        } catch (err) {
          console.error(`FAILED to upload ${localPath}:`, err)
          skipped++
          continue
        }
      }

      ;(doc as any)[field] = secureUrl
      await doc.save()
      updated++
    }
  }

  console.log(`\nDone. ${uploaded} file(s) uploaded to Cloudinary, ${updated} document(s) updated, ${skipped} failed.`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
