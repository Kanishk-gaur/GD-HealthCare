'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';

export type Language = 'en' | 'ru' | 'my' | 'fr' | 'ar';

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
  // Synchronous: returns the best translation available right now (falling
  // back to the original text) and kicks off a batched fetch for anything
  // missing. Components re-render automatically once results land.
  translate: (text: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Every string translated this tab session, shared by every component via
// the context below, and persisted to localStorage so repeat visits (and
// switching back to a language you've already used) don't refetch anything.
const memoryCache = new Map<Language, Record<string, string>>();

function cacheStorageKey(lang: Language) {
  return `gdh_translations_${lang}`;
}

function loadCachedTranslations(lang: Language): Record<string, string> {
  const cached = memoryCache.get(lang);
  if (cached) return cached;

  let stored: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(cacheStorageKey(lang));
      if (raw) stored = JSON.parse(raw);
    } catch {
      stored = {};
    }
  }
  memoryCache.set(lang, stored);
  return stored;
}

function persistTranslations(lang: Language, entries: Record<string, string>): Record<string, string> {
  const merged = { ...loadCachedTranslations(lang), ...entries };
  memoryCache.set(lang, merged);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(cacheStorageKey(lang), JSON.stringify(merged));
    } catch {
      // Storage full/unavailable — in-memory cache still works for this tab.
    }
  }
  return merged;
}

// Batch window: components across the whole tree call translate() during
// the same render pass, so a short debounce collects them all into one
// network request instead of firing one per string.
const BATCH_DELAY_MS = 30;

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start at 'en' so server and client render identically on the
  // first pass — reading localStorage here would make the client's first
  // render diverge from the server's and trigger a hydration mismatch on
  // every page for anyone who previously picked a non-English language.
  // The saved language (if any) is applied client-side after mount below.
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as Language | null;
    if (saved && saved in LANGUAGES && saved !== 'en') {
      setLanguageState(saved);
      setTranslations(loadCachedTranslations(saved));
    }
  }, []);

  const pendingRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inFlightRef = useRef(0);

  const flush = useCallback((lang: Language) => {
    timerRef.current = null;
    const texts = Array.from(pendingRef.current);
    pendingRef.current.clear();
    if (texts.length === 0) return;

    inFlightRef.current += 1;
    setIsLoading(true);

    fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts, targetLanguage: lang }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Translation request failed'))))
      .then((data: { translations?: string[] }) => {
        const entries: Record<string, string> = {};
        texts.forEach((t, i) => {
          entries[t] = data.translations?.[i] || t;
        });
        const merged = persistTranslations(lang, entries);
        setLanguageState((current) => {
          if (current === lang) {
            setTranslations(merged);
          }
          return current;
        });
      })
      .catch((error) => {
        console.error('Translation error:', error);
      })
      .finally(() => {
        inFlightRef.current -= 1;
        if (inFlightRef.current <= 0) setIsLoading(false);
      });
  }, []);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', lang);
      }
      pendingRef.current.clear();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setTranslations(lang === 'en' ? {} : loadCachedTranslations(lang));
    },
    []
  );

  const translate = useCallback(
    (text: string): string => {
      if (!text || language === 'en') return text;

      if (Object.prototype.hasOwnProperty.call(translations, text)) {
        return translations[text];
      }

      if (!pendingRef.current.has(text)) {
        pendingRef.current.add(text);
        if (timerRef.current) clearTimeout(timerRef.current);
        const lang = language;
        timerRef.current = setTimeout(() => flush(lang), BATCH_DELAY_MS);
      }

      return text;
    },
    [language, translations, flush]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
