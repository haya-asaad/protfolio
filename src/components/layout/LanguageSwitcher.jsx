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
      className={`inline-flex items-center gap-1 p-1 rounded-sm bg-[#F4F4F1] border border-[#E5E5E5] ${className}`}
      role="region"
      aria-label="Language Selector"
    >
      <span className="ps-2 pe-1 text-[#888888] hidden sm:inline-flex">
        <Globe className="w-3.5 h-3.5" />
      </span>
      {LANGUAGES.map((item) => {
        const isActive = lang === item.code;
        return (
          <button
            key={item.code}
            onClick={() => setLang(item.code)}
            aria-label={`Switch language to ${item.full}`}
            className={`px-2.5 py-1 text-xs font-medium rounded-sm transition-all duration-150 select-none ${
              isActive
                ? 'bg-[#111111] text-white shadow-none'
                : 'text-[#666666] hover:text-[#111111] hover:bg-black/5'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
