import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'ar', label: 'العربية', full: 'Arabic' },
  { code: 'he', label: 'עברית', full: 'Hebrew' },
];

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useTranslation();

  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-full bg-[#18181b]/80 border border-white/10 backdrop-blur-md ${className}`}
      role="region"
      aria-label="Language Selector"
    >
      <span className="ps-2 pe-1 text-[#71717a] hidden sm:inline-flex">
        <Globe className="w-3.5 h-3.5" />
      </span>
      {LANGUAGES.map((item) => {
        const isActive = lang === item.code;
        return (
          <button
            key={item.code}
            onClick={() => setLang(item.code)}
            aria-label={`Switch language to ${item.full}`}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 select-none ${
              isActive
                ? 'bg-[#c5a880] text-black shadow-md font-semibold'
                : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
