'use client';

import { useLanguage } from './context';
import { getTranslation } from './translations';

export function useTranslation() {
  const { language } = useLanguage();

  return (key: string) => getTranslation(language, key);
}
