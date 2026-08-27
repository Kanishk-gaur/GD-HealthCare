import { NextRequest, NextResponse } from 'next/server'

const languageMap: Record<string, string> = {
  en: 'en',
  ru: 'ru',
  my: 'my',
  fr: 'fr',
  ar: 'ar',
}

// Google's GET endpoint splits on "\n" and returns one aligned chunk per
// line, so a whole page's worth of strings can be translated in a single
// request instead of one round-trip per string.
const CHUNK_CHAR_LIMIT = 3500
const CHUNK_MAX_ITEMS = 60

function chunkTexts(texts: string[], maxChars = CHUNK_CHAR_LIMIT, maxItems = CHUNK_MAX_ITEMS): string[][] {
  const chunks: string[][] = []
  let current: string[] = []
  let currentLen = 0

  for (const text of texts) {
    const len = text.length + 1
    if (current.length > 0 && (currentLen + len > maxChars || current.length >= maxItems)) {
      chunks.push(current)
      current = []
      currentLen = 0
    }
    current.push(text)
    currentLen += len
  }
  if (current.length > 0) chunks.push(current)

  return chunks
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Google's unofficial endpoint has no SLA and rate-limits per source IP —
// a transient 429/5xx is common and usually succeeds a moment later, so a
// couple of short retries recover far more translations than giving up
// immediately.
async function fetchWithRetry(url: string, attempts = 3): Promise<Response | null> {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url, { headers: { Accept: 'application/json' } })
      if (response.ok) return response
      if (response.status !== 429 && response.status < 500) return response
    } catch {
      // network error — fall through to retry
    }
    if (i < attempts - 1) await sleep(300 * 2 ** i)
  }
  return null
}

// Caps how many requests are in flight at once. Firing every chunk (and every
// per-string fallback within a chunk) via Promise.all created bursts of dozens
// of simultaneous requests from the same server IP — exactly what trips
// Google's rate limiter. Running a handful at a time avoids provoking that.
async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  async function worker() {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

const CHUNK_CONCURRENCY = 3
const SINGLE_FALLBACK_CONCURRENCY = 5

// Returns null (rather than the original text) on failure, so callers can
// tell "genuinely translated" apart from "gave up" and patch just the gaps
// with a different provider instead of accepting silent English leftovers.
async function translateSingleUnofficial(text: string, target: string): Promise<string | null> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
    const response = await fetchWithRetry(url)
    if (!response) return null
    const data = await response.json()
    const joined = (data?.[0] ?? []).map((seg: unknown) => (Array.isArray(seg) ? seg[0] : '')).join('')
    return joined || null
  } catch {
    return null
  }
}

async function translateChunkUnofficial(chunk: string[], target: string): Promise<(string | null)[]> {
  // Internal newlines would throw off the 1-line-per-string alignment.
  const joined = chunk.map((t) => t.replace(/\n+/g, ' ')).join('\n')
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(joined)}`
    const response = await fetchWithRetry(url)
    if (!response) throw new Error('request failed after retries')
    const data = await response.json()
    const segments: unknown[] = data?.[0] ?? []
    const parts = segments.map((seg) => (Array.isArray(seg) && typeof seg[0] === 'string' ? seg[0].replace(/\n$/, '') : ''))

    if (parts.length !== chunk.length) throw new Error('chunk length mismatch')
    return parts.map((p) => p || null)
  } catch {
    // Google merged/split lines unexpectedly, or the whole-chunk request
    // never succeeded — fall back to translating this chunk one at a time
    // (capped concurrency, same retry logic) so a single bad line doesn't
    // sink the rest of the chunk.
    return mapWithConcurrency(chunk, SINGLE_FALLBACK_CONCURRENCY, (t) => translateSingleUnofficial(t, target))
  }
}

// Fast path: usually resolves a whole page's worth of strings in one or two
// round-trips. Not fully reliable (undocumented endpoint, shared serverless
// IPs can get rate-limited) — whatever comes back null gets patched by
// MyMemory below instead of silently staying in English.
async function translateBatchUnofficial(texts: string[], target: string): Promise<(string | null)[]> {
  const chunks = chunkTexts(texts)
  const results = await mapWithConcurrency(chunks, CHUNK_CONCURRENCY, (chunk) => translateChunkUnofficial(chunk, target))
  return results.flat()
}

// Chunk size well under Cloud Translation v2's documented request limits
// (128 segments / ~30k codepoints), so a big page still fits in very few
// requests instead of needing per-string calls the way the free paths do.
const OFFICIAL_CHUNK_CHAR_LIMIT = 8000
const OFFICIAL_CHUNK_MAX_ITEMS = 128
const OFFICIAL_CHUNK_CONCURRENCY = 4

async function translateChunkOfficial(chunk: string[], target: string, apiKey: string): Promise<(string | null)[]> {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: chunk, target, format: 'text' }),
      }
    )
    if (!response.ok) return chunk.map(() => null)

    const data = await response.json()
    const translations = data?.data?.translations?.map((t: { translatedText: string }) => t.translatedText)
    if (!Array.isArray(translations) || translations.length !== chunk.length) return chunk.map(() => null)
    return translations.map((t: unknown) => (typeof t === 'string' && t ? t : null))
  } catch {
    return chunk.map(() => null)
  }
}

// Returns null only when no key is configured at all (so the caller can skip
// straight to the free paths without wasting a request). Once a key exists,
// this always returns a same-length array — individual entries are null only
// for whatever a specific chunk failed on (e.g. a transient error, or the
// month's free quota running out mid-batch), so the caller can patch just
// those instead of throwing away an otherwise-successful batch.
async function translateBatchOfficial(texts: string[], target: string): Promise<(string | null)[] | null> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY
  if (!apiKey) return null

  const chunks = chunkTexts(texts, OFFICIAL_CHUNK_CHAR_LIMIT, OFFICIAL_CHUNK_MAX_ITEMS)
  const results = await mapWithConcurrency(chunks, OFFICIAL_CHUNK_CONCURRENCY, (chunk) =>
    translateChunkOfficial(chunk, target, apiKey)
  )
  return results.flat()
}

// MyMemory is a real, documented, keyless translation API — free (5,000
// words/day anonymously, 50,000/day if MYMEMORY_EMAIL is set). No batching
// support (one string per request, ~1-4s each), so it's used as a backstop
// for whatever the fast batched path above couldn't translate, not as the
// primary path — running it over a whole page's worth of strings would make
// language switching feel like it hung.
const MYMEMORY_CONCURRENCY = 6

async function translateSingleMyMemory(text: string, target: string): Promise<string | null> {
  try {
    const email = process.env.MYMEMORY_EMAIL
    const params = new URLSearchParams({ q: text, langpair: `en|${target}` })
    if (email) params.set('de', email)
    const response = await fetchWithRetry(`https://api.mymemory.translated.net/get?${params.toString()}`)
    if (!response) return null

    const data = await response.json()
    if (data?.responseStatus !== 200 || data?.quotaFinished) return null
    const translated = data?.responseData?.translatedText
    return typeof translated === 'string' && translated.trim() ? translated : null
  } catch {
    return null
  }
}

async function patchMissingWithMyMemory(texts: string[], target: string, results: (string | null)[]): Promise<string[]> {
  const missingIndices: number[] = []
  results.forEach((r, i) => {
    if (r === null) missingIndices.push(i)
  })

  if (missingIndices.length > 0) {
    const patched = await mapWithConcurrency(missingIndices, MYMEMORY_CONCURRENCY, (i) =>
      translateSingleMyMemory(texts[i], target)
    )
    missingIndices.forEach((originalIndex, i) => {
      results[originalIndex] = patched[i]
    })
  }

  // Whatever is still null after both providers keeps the original text.
  return results.map((r, i) => r ?? texts[i])
}

async function translateBatch(texts: string[], target: string): Promise<string[]> {
  // No key: skip straight to the free fast path over everything.
  // Key configured: only chase the free paths for whatever slots came back
  // null (ideally none — a healthy key resolves the whole batch in one or
  // two requests and every step below is skipped entirely).
  const official = await translateBatchOfficial(texts, target)
  const combined: (string | null)[] = official ?? new Array(texts.length).fill(null)

  const missingIndices: number[] = []
  combined.forEach((v, i) => {
    if (v === null) missingIndices.push(i)
  })

  if (missingIndices.length > 0) {
    const missingTexts = missingIndices.map((i) => texts[i])
    const fastResults = await translateBatchUnofficial(missingTexts, target)
    missingIndices.forEach((originalIndex, i) => {
      combined[originalIndex] = fastResults[i]
    })
  }

  return patchMissingWithMyMemory(texts, target, combined)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const targetLanguage: string | undefined = body.targetLanguage
    const texts: string[] = Array.isArray(body.texts)
      ? body.texts
      : typeof body.text === 'string'
        ? [body.text]
        : []

    if (!targetLanguage || texts.length === 0) {
      return NextResponse.json({ error: 'Missing texts or targetLanguage' }, { status: 400 })
    }

    const target = languageMap[targetLanguage]
    if (!target) {
      return NextResponse.json({ error: 'Unsupported language' }, { status: 400 })
    }

    // Translate each distinct string once even if it appears many times
    // across a page (e.g. repeated card labels).
    const uniqueTexts = Array.from(new Set(texts.filter((t) => t && t.trim())))
    const translatedUnique = uniqueTexts.length > 0 ? await translateBatch(uniqueTexts, target) : []
    const lookup = new Map(uniqueTexts.map((t, i) => [t, translatedUnique[i] ?? t]))

    const translations = texts.map((t) => (t && t.trim() ? (lookup.get(t) ?? t) : t))

    return NextResponse.json({ translations })
  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
