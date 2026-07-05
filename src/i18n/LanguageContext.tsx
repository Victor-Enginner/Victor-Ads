import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Language, TranslationKey } from './translations';
import { translations } from './translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string>) => string;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Language {
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'pt' || stored === 'en') return stored;
  } catch {}
  // Default to English
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem('lang', next);
    } catch {}
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'pt' : 'en');
  };

  const t = (key: TranslationKey, vars?: Record<string, string>): string => {
    let text = translations[lang][key];
    if (text === undefined) {
      // Fallback to English
      text = translations.en[key];
    }
    if (text === undefined) return key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(`{${k}}`, v);
      }
    }
    return text;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within a LanguageProvider');
  return ctx;
}
