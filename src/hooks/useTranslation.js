import { useLanguage } from './useLanguage';

export function useTranslation() {
  const { lang, setLang, isRTL, t, supportedLanguages } = useLanguage();

  /**
   * Helper to retrieve localized value from objects like:
   * { en: "Text", ar: "نص", he: "טקסט" }
   */
  const getLocalized = (obj, fallback = '') => {
    if (!obj || typeof obj !== 'object') return fallback;
    return obj[lang] || obj.en || obj.ar || obj.he || fallback;
  };

  return {
    t,
    lang,
    setLang,
    isRTL,
    supportedLanguages,
    getLocalized,
  };
}
