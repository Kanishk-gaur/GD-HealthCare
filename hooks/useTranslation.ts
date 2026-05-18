'use client'

import { useEffect, useState, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface TranslationCache {
  [key: string]: string
}

export function useTranslation(texts: string[]) {
  const { language, translate: apiTranslate } = useLanguage()
  const [translations, setTranslations] = useState<TranslationCache>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (language === 'en') {
      setTranslations({})
      return
    }

    const untranslatedTexts = texts.filter(text => !translations[text])
    if (untranslatedTexts.length === 0) return

    setIsLoading(true)
    Promise.all(untranslatedTexts.map(text => apiTranslate(text)))
      .then(results => {
        const newTranslations: TranslationCache = {}
        untranslatedTexts.forEach((text, index) => {
          newTranslations[text] = results[index]
        })
        setTranslations(prev => ({ ...prev, ...newTranslations }))
      })
      .catch(err => console.error('Translation error:', err))
      .finally(() => setIsLoading(false))
  }, [language, texts, translations, apiTranslate])

  const translate = useCallback((text: string): string => {
    if (language === 'en') return text
    return translations[text] || text
  }, [language, translations])

  return { translate, isLoading, language }
}
