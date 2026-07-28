import mongoose from 'mongoose'

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined
}

const cached: MongooseCache = global._mongooseCache ?? { conn: null, promise: null }
global._mongooseCache = cached

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    // This check must live INSIDE the function, not at module top-level —
    // throwing at import time crashes every route that imports this file
    // (even indirectly via lib/auth.ts) as soon as Next.js loads it.
    throw new Error(
      'Missing MONGODB_URI environment variable. Add it to .env.local (see .env.local.example) and restart the dev server.'
    )
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }

  return cached.conn
}

export default connectToDatabase