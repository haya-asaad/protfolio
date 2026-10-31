import React from 'react';
import { MapPin, ArrowUpRight, Images } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import ArchitecturalImage from './ArchitecturalImage';

export default function ProjectCard({
  project,
  onOpenDetails,
  onOpenLightbox,
  index = 0,
}) {
  const { t, getLocalized } = useTranslation();

  const title = getLocalized(project.title);
  const location = getLocalized(project.location);
  const description = getLocalized(project.description);
  const categoryLabel = t(`filters.${project.category}`);

  return (
    <article className="group relative bg-white border border-[#E5E5E5] rounded-sm overflow-hidden hover:border-[#111111] transition-colors flex flex-col h-full">
      {/* Top Image Frame */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F4F1] border-b border-[#EAEAE6]">
        <ArchitecturalImage
          src={project.coverImage}
          alt={title}
          category={project.category}
          title={title}
          className="w-full h-full cursor-pointer"
          onClick={() => onOpenDetails(project)}
        />

        {/* Minimalist Overlay Badges */}
        <div className="absolute top-3 start-3 end-3 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2.5 py-0.5 rounded-xs text-[10px] font-mono uppercase tracking-wider bg-white/95 text-[#111111] border border-[#E5E5E5]">
            {categoryLabel}
          </span>
          <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono bg-white/95 text-[#555555] border border-[#E5E5E5]">
            {project.year}
          </span>
        </div>

        {/* Quick Gallery Trigger Button */}
        {project.gallery && project.gallery.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(project, 0);
            }}
            aria-label={`Open gallery for ${title}`}
            className="absolute bottom-3 end-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-[11px] font-medium bg-white/95 hover:bg-[#111111] text-[#111111] hover:text-white border border-[#E5E5E5] transition-colors shadow-none"
          >
            <Images className="w-3.5 h-3.5" />
            <span>{project.gallery.length + 1}</span>
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-[#444444] font-mono font-medium mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#111111]" />
              <span className="truncate max-w-[200px]">{location}</span>
            </span>
          </div>

          {/* Project Title */}
          <h3
            onClick={() => onOpenDetails(project)}
            className="font-serif-title text-xl font-bold text-[#111111] group-hover:text-[#333333] transition-colors cursor-pointer line-clamp-1"
          >
            {title}
          </h3>

          {/* Project Concept Excerpt */}
          <p className="mt-2 text-xs text-[#333333] line-clamp-2 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Action Footnote */}
        <div className="pt-4 border-t border-[#EEEEEE] flex items-center justify-between">
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#111111] uppercase tracking-wider hover:text-[#555555] transition-colors"
          >
            <span>{t('portfolio.viewProject')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono font-medium text-[#555555]">
            REF #{String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </article>
  );
}
