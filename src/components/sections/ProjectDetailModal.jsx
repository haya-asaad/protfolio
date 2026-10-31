import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  Maximize2,
  BookOpen,
  Video,
  ArrowLeft,
  ArrowRight,
  Images,
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import ArchitecturalImage from '../ui/ArchitecturalImage';
import ImageGallery from '../ui/ImageGallery';

export default function ProjectDetailModal({
  project,
  subGalleryId = null,
  onClose,
  onSelectProject,
  onSelectSubGalleryId,
  onOpenLightbox,
  prevProject = null,
  nextProject = null,
}) {
  const { t, getLocalized, isRTL } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project?.id, subGalleryId]);

  if (!project) return null;

  const title = getLocalized(project.title);
  const projectName = getLocalized(project.projectName);
  const projectType = getLocalized(project.projectType);
  const year = getLocalized(project.year);
  const location = getLocalized(project.location);
  const supervisors = getLocalized(project.supervisors);
  const description = getLocalized(project.description);
  const categoryLabel = projectType || t(`filters.${project.category}`);
  const links = project.links || [];
  const hasMetadata = Boolean(projectName || location || year || projectType);

  const activeSubGallery =
    subGalleryId && Array.isArray(project.gallery)
      ? project.gallery.find(
          (item) => typeof item === 'object' && item !== null && item.id === subGalleryId
        ) || null
      : null;

  // If viewing a specific sub-gallery collection page
  if (activeSubGallery) {
    const subTitle = getLocalized(activeSubGallery.title);
    return (
      <motion.section
        key={`${project.id}-${activeSubGallery.id}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="pt-28 pb-24 min-h-screen bg-[#FAF9F6]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5E5] pb-6">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onSelectSubGalleryId(null)}
                className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-[#444444] hover:text-[#111111] transition-colors"
              >
                {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{title}</span>
              </button>
              <h1 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight">
                {subTitle}
              </h1>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenLightbox(
                  project,
                  0,
                  activeSubGallery.images,
                  `${title} — ${subTitle}`
                )
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] hover:bg-[#333333] text-white text-xs font-medium uppercase tracking-wider transition-colors"
            >
              <Images className="w-4 h-4" />
              <span>{t('portfolio.viewGallery')}</span>
            </button>
          </div>

          {/* Sub-Gallery Images Grid */}
          <ImageGallery
            images={activeSubGallery.images}
            projectTitle={subTitle}
            category={project.category}
            onSelectImage={(idx) =>
              onOpenLightbox(
                project,
                idx,
                activeSubGallery.images,
                `${title} — ${subTitle}`
              )
            }
          />
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      key={project.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="pt-28 pb-24 min-h-screen bg-[#FAF9F6]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back to Portfolio Link + Header */}
        <div className="space-y-6 border-b border-[#E5E5E5] pb-8">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#E5E5E5] hover:border-[#111111] text-xs font-mono font-medium uppercase tracking-wider text-[#111111] transition-colors"
          >
            {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{t('portfolio.title')}</span>
          </button>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-mono font-medium uppercase bg-white text-[#111111] border border-[#E5E5E5]">
                {categoryLabel}
              </span>
              {year && (
                <span className="text-xs font-mono font-medium text-[#444444]">
                  {year}
                </span>
              )}
            </div>

            <h1 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight">
              {title}
            </h1>

            {projectName && (
              <p className="text-base sm:text-lg font-mono font-medium text-[#333333]">
                {projectName}
              </p>
            )}
          </div>
        </div>

        {/* Primary Cover Image Frame */}
        <div className="relative flex items-center justify-center overflow-hidden border border-[#E5E5E5] group bg-white">
          <ArchitecturalImage
            src={project.coverImage}
            alt={title}
            category={project.category}
            title={title}
            className="w-full h-auto border-0 bg-white cursor-pointer"
            imgClassName="w-full h-auto max-h-[82vh] object-contain block mx-auto"
            onClick={() => onOpenLightbox(project, 0)}
          />
          <button
            type="button"
            onClick={() => onOpenLightbox(project, 0)}
            aria-label="Enlarge image"
            className="absolute bottom-4 end-4 p-2.5 bg-[#111111] text-white hover:bg-[#333333] transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Architectural Specifications Grid */}
        {hasMetadata && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-[#E5E5E5] font-mono text-xs">
            {projectName && (
              <div>
                <span className="block text-[10px] font-medium text-[#444444] uppercase tracking-wider">
                  {t('portfolio.metaProjectName')}
                </span>
                <span className="text-[#111111] font-medium block mt-1">
                  {projectName}
                </span>
              </div>
            )}

            {year && (
              <div>
                <span className="block text-[10px] font-medium text-[#444444] uppercase tracking-wider">
                  {t('portfolio.metaYear')}
                </span>
                <span className="text-[#111111] font-medium flex items-center gap-1 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                  {year}
                </span>
              </div>
            )}

            {location && (
              <div>
                <span className="block text-[10px] font-medium text-[#444444] uppercase tracking-wider">
                  {t('portfolio.metaLocation')}
                </span>
                <span className="text-[#111111] font-medium flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#111111]" />
                  {location}
                </span>
              </div>
            )}

            {projectType && (
              <div>
                <span className="block text-[10px] font-medium text-[#444444] uppercase tracking-wider">
                  {t('portfolio.metaCategory')}
                </span>
                <span className="text-[#111111] font-medium flex items-center gap-1 mt-1">
                  <Layers className="w-3.5 h-3.5 text-[#111111]" />
                  {projectType}
                </span>
              </div>
            )}
          </div>
        )}

        {/* External Project Links (Project Book / Project Video) */}
        {links.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            {links.map((link, idx) => (
              <a
                key={link.url + idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#111111] hover:bg-[#333333] text-white text-xs font-medium uppercase tracking-wider transition-colors"
              >
                {link.type === 'book' ? (
                  <BookOpen className="w-4 h-4" />
                ) : (
                  <Video className="w-4 h-4" />
                )}
                <span>{getLocalized(link.label)}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        )}

        {/* Supervisors (if present) */}
        {supervisors && (
          <div className="p-6 bg-white border border-[#E5E5E5] space-y-2">
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-[#444444]">
              {t('modal.supervisors')}
            </h3>
            <p className="text-sm sm:text-base text-[#111111] whitespace-pre-line leading-relaxed">
              {supervisors}
            </p>
          </div>
        )}

        {/* Concept Brief & Architectural Narrative */}
        {description && (
          <div className="p-6 sm:p-8 bg-white border border-[#E5E5E5] space-y-4">
            <p className="text-[#222222] text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
              {description}
            </p>
          </div>
        )}

        {/* Gallery of Project Plates & Sub-Galleries */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="border-b border-[#E5E5E5] pb-3 flex items-center justify-between">
              <h2 className="font-serif-title text-2xl font-bold text-[#111111]">
                {t('modal.drawings')}
              </h2>
            </div>

            <ImageGallery
              images={project.gallery}
              projectTitle={title}
              category={project.category}
              onSelectSubGallery={(subGallery) => onSelectSubGalleryId(subGallery.id)}
              onSelectImage={(idx) => onOpenLightbox(project, idx + 1)}
            />
          </div>
        )}

        {/* Previous Project / Next Project Navigation Footer (matching haya-assad.com) */}
        <div className="pt-8 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-4">
          {prevProject ? (
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-[#E5E5E5] hover:border-[#111111] text-xs font-mono font-medium uppercase tracking-wider text-[#111111] transition-colors"
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t('modal.prev')}</span>
            </button>
          ) : (
            <div />
          )}

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white hover:bg-[#333333] text-xs font-medium uppercase tracking-wider transition-colors"
          >
            <span>{t('modal.contactAboutProject')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {nextProject ? (
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-[#E5E5E5] hover:border-[#111111] text-xs font-mono font-medium uppercase tracking-wider text-[#111111] transition-colors"
            >
              <span>{t('modal.next')}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </motion.section>
  );
}
