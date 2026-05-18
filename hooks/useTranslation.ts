'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface TranslationCache {
  [key: string]: string
}

export function useTranslation() {
  const { language, translate: apiTranslate } = useLanguage()
  const [translations, setTranslations] = useState<TranslationCache>({})
  const pendingTranslations = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (language === 'en') {
      setTranslations({})
      pendingTranslations.current.clear()
    }
  }, [language])

  const translate = useCallback((text: string): string => {
    if (!text || language === 'en') return text

    if (translations[text]) {
      return translations[text]
    }

    if (!pendingTranslations.current.has(text)) {
      pendingTranslations.current.add(text)

      apiTranslate(text)
        .then((result) => {
          setTranslations((prev) => ({
            ...prev,
            [text]: result,
          }))
        })
        .catch((err) => {
          console.error('Automatic translation error for:', text, err)
        })
        .finally(() => {
          pendingTranslations.current.delete(text)
        })
    }

    return text
  }, [language, translations, apiTranslate])

  return { translate, language }
}