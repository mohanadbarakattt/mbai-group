import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Dict, Locale } from './types';
import en from './en';
import ar from './ar';
import franco from './franco';

const DICTS: Record<Locale, Dict> = { en, ar, franco };

/** BCP-47-ish tags for <html lang>. Franco is Egyptian Arabic, Latin script. */
const LANG_TAGS: Record<Locale, string> = { en: 'en', ar: 'ar', franco: 'arz-Latn' };
const DIRECTIONS: Record<Locale, 'ltr' | 'rtl'> = { en: 'ltr', ar: 'rtl', franco: 'ltr' };

const STORAGE_KEY = 'mbai-locale';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dict: Dict;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextValue | null>(null);

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar' || stored === 'franco') return stored;
  } catch {
    /* localStorage unavailable (private mode, etc.) — fall back to default */
  }
  return 'en';
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  useEffect(() => {
    document.documentElement.lang = LANG_TAGS[locale];
    document.documentElement.dir = DIRECTIONS[locale];
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore write failures — locale just won't persist across reloads */
    }
  };

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, dict: DICTS[locale], dir: DIRECTIONS[locale] }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

/** Access the current locale, its full dictionary, direction, and a setter. */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n() must be used within <I18nProvider>');
  return ctx;
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  ar: 'AR',
  franco: 'FX',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  franco: 'Franco',
};
