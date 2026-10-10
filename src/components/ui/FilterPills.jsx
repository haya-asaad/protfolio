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
            className={`group inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs sm:text-sm font-medium transition-colors select-none ${
              isActive
                ? 'bg-[#111111] text-white shadow-none'
                : 'bg-[#F4F4F1] text-[#555555] border border-[#E5E5E5] hover:border-[#CCCCCC] hover:text-[#111111]'
            }`}
          >
            <span>{label}</span>
            <span
              className={`text-[10px] font-mono transition-colors ${
                isActive ? 'text-[#AAAAAA]' : 'text-[#888888] group-hover:text-[#111111]'
              }`}
            >
              [{count}]
            </span>
          </button>
        );
      })}
    </div>
  );
}
