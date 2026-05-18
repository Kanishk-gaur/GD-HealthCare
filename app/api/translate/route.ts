import { NextRequest, NextResponse } from 'next/server'

const languageMap: Record<string, string> = {
  en: 'en',
  ru: 'ru',
  my: 'my',
  fr: 'fr',
  ar: 'ar',
}

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json()

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing text or targetLanguage' },
        { status: 400 }
      )
    }

    const target = languageMap[targetLanguage]
    if (!target) {
      return NextResponse.json(
        { error: 'Unsupported language' },
        { status: 400 }
      )
    }

    let translatedText = text

    // 1. Try official Google Translate API if credentials exist in your .env
    if (process.env.GOOGLE_TRANSLATE_API_KEY && process.env.GOOGLE_CLOUD_PROJECT_ID) {
      try {
        const response = await fetch(
          `https://translation.googleapis.com/language/translate/v2`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              q: text,
              target,
              key: process.env.GOOGLE_TRANSLATE_API_KEY,
            }),
          }
        )

        if (response.ok) {
          const data = await response.json()
          translatedText = data.data.translations[0].translatedText
          return NextResponse.json({ translatedText, originalText: text, language: targetLanguage })
        }
      } catch (error) {
        console.warn('Official Google Translate API failed, switching to dynamic fallback:', error)
      }
    }

    // 2. AUTOMATIC TRANSLATION FALLBACK (For working completely on-the-fly without keys)
    // This fetches a live translation directly for whatever string is currently rendering on screen.
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      })

      if (response.ok) {
        const data = await response.json()
        if (data && data[0]) {
          // Merge multiple translated chunks if it is a long paragraph
          translatedText = data[0].map((item: any) => item[0]).join('')
        }
      }
    } catch (fallbackError) {
      console.error('On-the-fly fallback translation failed:', fallbackError)
    }

    return NextResponse.json({
      translatedText,
      originalText: text,
      language: targetLanguage,
    })
  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}