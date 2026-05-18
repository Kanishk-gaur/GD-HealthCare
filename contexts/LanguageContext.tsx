'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// 1. Precise Language keys requested (en as default, ru, my, fr, ar)
export type Language = 'en' | 'ru' | 'my' | 'fr' | 'ar';

// 2. Display names mapping
export const LANGUAGES: Record<Language, string> = {
  en: 'English',
  ru: 'Русский',
  my: 'မြန်မာဘာသာ',
  fr: 'Français',
  ar: 'العربية',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => Promise<string>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 3. Initialize state with English as the absolute default
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred-language') as Language;
      if (saved && saved in LANGUAGES) return saved;
    }
    return 'en';
  });
  const [isLoading, setIsLoading] = useState(false);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang);
    }
  }, []);

  const translate = useCallback(async (text: string): Promise<string> => {
    if (language === 'en' || !text) return text;

    setIsLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          targetLanguage: language,
        }),
      });

      if (!response.ok) throw new Error('Translation failed');
      const data = await response.json();
      return data.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (undefined === context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}