// lib/TranslationContext.tsx
'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'

interface TranslationContextType {
  translate: (text: string) => string
  language: string
  setLanguage: (lang: string) => void
  isLoading: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

// Cache for translations to avoid repeated lookups
const translationCache = new Map<string, string>()

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en')
  const [isLoading, setIsLoading] = useState(false)
  const [dictionary, setDictionary] = useState<Record<string, string>>({})

  // Load saved language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred_language')
    if (savedLang && savedLang !== 'en') {
      setLanguage(savedLang)
      loadTranslations(savedLang)
    }
  }, [])

  const loadTranslations = async (lang: string) => {
    if (lang === 'en') {
      setDictionary({})
      return
    }
    
    setIsLoading(true)
    try {
      // You can replace this with your actual translation API endpoint
      const response = await fetch(`/api/translations?lang=${lang}`)
      const data = await response.json()
      setDictionary(data)
    } catch (error) {
      console.error('Failed to load translations:', error)
      // Fallback: use a simple mapping for demo
      const fallbackTranslations: Record<string, string> = {
        'Hello': 'Hola',
        'Welcome': 'Bienvenido',
        // Add more translations as needed
      }
      setDictionary(fallbackTranslations)
    } finally {
      setIsLoading(false)
    }
  }

  const translate = useCallback((text: string) => {
    // If language is English, return original text
    if (language === 'en') return text
    
    // Check cache first
    const cacheKey = `${text}_${language}`
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!
    }
    
    // Check dictionary
    if (dictionary[text]) {
      translationCache.set(cacheKey, dictionary[text])
      return dictionary[text]
    }
    
    // Return original text if no translation found
    return text
  }, [language, dictionary])

  const setLanguageWithSave = useCallback(async (lang: string) => {
    setLanguage(lang)
    localStorage.setItem('preferred_language', lang)
    if (lang !== 'en') {
      await loadTranslations(lang)
    } else {
      setDictionary({})
      translationCache.clear()
    }
  }, [])

  return (
    <TranslationContext.Provider 
      value={{ 
        translate, 
        language, 
        setLanguage: setLanguageWithSave, 
        isLoading 
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}