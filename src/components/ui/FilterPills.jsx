import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export default function FilterPills({
  categories = [],
  activeCategory = 'all',
  onSelectCategory,
  categoryCounts = {},
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4" role="tablist">
      {categories.map((catKey) => {
        const isActive = activeCategory === catKey;
        const count = categoryCounts[catKey] ?? 0;
        const label = t(`filters.${catKey}`);

        return (
          <button
            key={catKey}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(catKey)}
            className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 select-none ${
              isActive
                ? 'bg-[#c5a880] text-black shadow-lg shadow-[#c5a880]/20 font-semibold'
                : 'bg-[#18181b] text-[#a1a1aa] border border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            <span>{label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                isActive
                  ? 'bg-black/20 text-black font-bold'
                  : 'bg-white/5 text-[#71717a] group-hover:text-white'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
