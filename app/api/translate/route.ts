import { NextRequest, NextResponse } from 'next/server'

const languageMap: Record<string, string> = {
  en: 'en',
  hi: 'hi',
  ar: 'ar',
  fr: 'fr',
  ru: 'ru',
  es: 'es',
}

// Basic fallback translations for demo purposes
const basicTranslations: Record<string, Record<string, string>> = {
  hi: {
    'Premium Medical Tourism Solutions': 'प्रीमियम चिकित्सा पर्यटन समाधान',
    'Access world-class healthcare at affordable prices': 'सस्ती कीमतों पर विश्व स्तरीय स्वास्थ्यसेवा प्राप्त करें',
    'Free Consultation': 'मुफ्त परामर्श',
    'Explore Treatments': 'उपचार की खोज करें',
    'Learn More': 'अधिक जानें',
  },
  ar: {
    'Premium Medical Tourism Solutions': 'حلول السياحة الطبية الممتازة',
    'Access world-class healthcare at affordable prices': 'الوصول إلى الرعاية الصحية على المستوى العالمي بأسعار معقولة',
    'Free Consultation': 'استشارة مجانية',
    'Explore Treatments': 'استكشاف العلاجات',
    'Learn More': 'اعرف أكثر',
  },
  es: {
    'Premium Medical Tourism Solutions': 'Soluciones de Turismo Médico Premium',
    'Access world-class healthcare at affordable prices': 'Acceda a atención médica de clase mundial a precios asequibles',
    'Free Consultation': 'Consulta Gratuita',
    'Explore Treatments': 'Explorar Tratamientos',
    'Learn More': 'Aprende Más',
  },
  fr: {
    'Premium Medical Tourism Solutions': 'Solutions de Tourisme Médical Premium',
    'Access world-class healthcare at affordable prices': 'Accédez aux soins de santé de classe mondiale à des prix abordables',
    'Free Consultation': 'Consultation Gratuite',
    'Explore Treatments': 'Explorer les Traitements',
    'Learn More': 'En Savoir Plus',
  },
  ru: {
    'Premium Medical Tourism Solutions': 'Премиум решения медицинского туризма',
    'Access world-class healthcare at affordable prices': 'Получите доступ к здравоохранению мирового класса по доступным ценам',
    'Free Consultation': 'Бесплатная консультация',
    'Explore Treatments': 'Изучить методы лечения',
    'Learn More': 'Узнать больше',
  },
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

    // Try Google Translate API if credentials are set
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
        }
      } catch (error) {
        console.warn('Google Translate API failed, using fallback:', error)
        // Fall through to basic translations
        translatedText = basicTranslations[targetLanguage]?.[text] || text
      }
    } else {
      // Use basic fallback translations when API credentials aren't configured
      translatedText = basicTranslations[targetLanguage]?.[text] || text
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
