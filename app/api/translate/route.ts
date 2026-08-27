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

function chunkTexts(texts: string[]): string[][] {
  const chunks: string[][] = []
  let current: string[] = []
  let currentLen = 0

  for (const text of texts) {
    const len = text.length + 1
    if (current.length > 0 && (currentLen + len > CHUNK_CHAR_LIMIT || current.length >= CHUNK_MAX_ITEMS)) {
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
// immediately (which used to silently leave the original English text).
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
// Google's rate limiter and made some strings translate while others silently
// didn't. Running a handful at a time avoids provoking that in the first place.
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

async function translateSingleUnofficial(text: string, target: string): Promise<string> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
    const response = await fetchWithRetry(url)
    if (!response) return text
    const data = await response.json()
    const joined = (data?.[0] ?? []).map((seg: unknown) => (Array.isArray(seg) ? seg[0] : '')).join('')
    return joined || text
  } catch {
    return text
  }
}

async function translateChunkUnofficial(chunk: string[], target: string): Promise<string[]> {
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
    return parts
  } catch {
    // Google merged/split lines unexpectedly, or the whole-chunk request
    // never succeeded — fall back to translating this chunk one at a time
    // (capped concurrency, same retry logic) so a single bad line or a
    // rate-limited request doesn't leave the rest of the chunk untranslated.
    return mapWithConcurrency(chunk, SINGLE_FALLBACK_CONCURRENCY, (t) => translateSingleUnofficial(t, target))
  }
}

async function translateBatchUnofficial(texts: string[], target: string): Promise<string[]> {
  const chunks = chunkTexts(texts)
  const results = await mapWithConcurrency(chunks, CHUNK_CONCURRENCY, (chunk) => translateChunkUnofficial(chunk, target))
  return results.flat()
}

async function translateBatchOfficial(texts: string[], target: string): Promise<string[] | null> {
  if (!process.env.GOOGLE_TRANSLATE_API_KEY) return null

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: texts, target, format: 'text' }),
      }
    )
    if (!response.ok) return null

    const data = await response.json()
    const translations = data?.data?.translations?.map((t: { translatedText: string }) => t.translatedText)
    if (Array.isArray(translations) && translations.length === texts.length) return translations
    return null
  } catch {
    return null
  }
}

async function translateBatch(texts: string[], target: string): Promise<string[]> {
  const official = await translateBatchOfficial(texts, target)
  if (official) return official
  return translateBatchUnofficial(texts, target)
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
