'use client'

import { useLanguage } from '@/contexts/LanguageContext'

// Thin wrapper kept so call sites don't need to know about LanguageContext
// directly. All batching/caching lives in the context now.
export function useTranslation() {
  const { translate, language } = useLanguage()
  return { translate, language }
}
