import React, { useState, useEffect } from 'react';
import { LanguageContext } from './languageContextInstance';
import translations from '../data/translations.json';

const SUPPORTED_LANGUAGES = ['en', 'ar', 'he'];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('haya_portfolio_lang');
      if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
        return saved;
      }
    } catch {
      // LocalStorage access fallback
    }
    return 'en';
  });

  const isRTL = lang === 'ar' || lang === 'he';

  const setLang = (newLang) => {
    if (SUPPORTED_LANGUAGES.includes(newLang)) {
      setLangState(newLang);
      try {
        localStorage.setItem('haya_portfolio_lang', newLang);
      } catch {
        // LocalStorage fallback
      }
    }
  };

  useEffect(() => {
    // Synchronize HTML attributes for accessibility and layout direction
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang, isRTL]);

  // Nested translation resolver
  const t = (path, replacements = {}) => {
    const keys = path.split('.');
    let current = translations[lang];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English dictionary
        let fallback = translations.en;
        for (const fbKey of keys) {
          if (fallback && typeof fallback === 'object' && fbKey in fallback) {
            fallback = fallback[fbKey];
          } else {
            return path; // Return key path if missing
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current === 'string') {
      let result = current;
      for (const [key, value] of Object.entries(replacements)) {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
      }
      return result;
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isRTL, t, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}
