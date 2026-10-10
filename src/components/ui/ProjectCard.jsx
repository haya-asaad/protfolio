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
    <article className="group relative bg-[#121215] border border-white/10 rounded-2xl overflow-hidden hover:border-[#c5a880]/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-2xl hover:shadow-black/60">
      {/* Top Image Frame with Aspect Ratio */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#18181b]">
        <ArchitecturalImage
          src={project.coverImage}
          alt={title}
          category={project.category}
          title={title}
          className="w-full h-full cursor-pointer"
          onClick={() => onOpenDetails(project)}
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 start-3 end-3 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#c5a880] border border-white/10">
            {categoryLabel}
          </span>
          <span className="px-2 py-1 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-md text-[#a1a1aa] border border-white/10">
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
            className="absolute bottom-3 end-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/75 hover:bg-[#c5a880] text-white hover:text-black border border-white/10 transition-all duration-200 backdrop-blur-md shadow-md"
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
          <div className="flex items-center gap-2 text-xs text-[#a1a1aa] font-mono mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="truncate max-w-[200px]">{location}</span>
            </span>
          </div>

          {/* Project Title */}
          <h3
            onClick={() => onOpenDetails(project)}
            className="font-serif-title text-xl font-bold text-white group-hover:text-[#c5a880] transition-colors cursor-pointer line-clamp-1"
          >
            {title}
          </h3>

          {/* Project Concept Excerpt */}
          <p className="mt-2 text-xs text-[#a1a1aa] line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Footnote */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#c5a880] hover:text-[#e4cfb4] transition-colors"
          >
            <span>{t('portfolio.viewProject')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono text-[#71717a]">
            REF #{String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </article>
  );
}
