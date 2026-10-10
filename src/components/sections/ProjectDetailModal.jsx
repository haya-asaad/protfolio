import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Layers, ArrowUpRight, Maximize2 } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import ArchitecturalImage from '../ui/ArchitecturalImage';
import ImageGallery from '../ui/ImageGallery';

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onOpenLightbox,
}) {
  const { t, getLocalized } = useTranslation();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const title = getLocalized(project.title);
  const location = getLocalized(project.location);
  const description = getLocalized(project.description);
  const categoryLabel = t(`filters.${project.category}`);

  const allImages = [project.coverImage, ...(project.gallery || [])];

  const handleInquire = () => {
    onClose();
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-white border border-[#E5E5E5] rounded-none md:rounded-sm overflow-hidden shadow-xl my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5] shrink-0 bg-[#F8F7F4]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-white text-[#111111] border border-[#E5E5E5]">
                  {categoryLabel}
                </span>
                <span className="text-xs font-mono text-[#777777]">
                  {project.year}
                </span>
              </div>
              <h2
                id="modal-project-title"
                className="font-serif-title text-xl sm:text-2xl font-bold text-[#111111]"
              >
                {title}
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label={t('modal.close')}
              className="p-2 rounded-xs bg-white hover:bg-[#EFEFEA] text-[#111111] transition-colors border border-[#E5E5E5]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8 bg-white">
            {/* Primary Cover Image Frame */}
            <div className="relative aspect-[16/9] overflow-hidden border border-[#E5E5E5] group bg-[#F4F4F1]">
              <ArchitecturalImage
                src={project.coverImage}
                alt={title}
                category={project.category}
                title={title}
                className="w-full h-full cursor-pointer"
                onClick={() => onOpenLightbox(project, 0)}
              />
              <button
                onClick={() => onOpenLightbox(project, 0)}
                aria-label="Enlarge image"
                className="absolute bottom-4 end-4 p-2.5 bg-[#111111] text-white hover:bg-[#333333] transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Architectural Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-none bg-[#F8F7F4] border border-[#E5E5E5] font-mono text-xs">
              <div>
                <span className="block text-[10px] text-[#777777] uppercase tracking-wider">
                  {t('portfolio.metaLocation')}
                </span>
                <span className="text-[#111111] font-medium flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-[#111111]" />
                  {location}
                </span>
              </div>

              <div>
                <span className="block text-[10px] text-[#777777] uppercase tracking-wider">
                  {t('portfolio.metaYear')}
                </span>
                <span className="text-[#111111] font-medium flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3 text-[#111111]" />
                  {project.year}
                </span>
              </div>

              <div>
                <span className="block text-[10px] text-[#777777] uppercase tracking-wider">
                  {t('portfolio.metaCategory')}
                </span>
                <span className="text-[#111111] font-medium flex items-center gap-1 mt-1">
                  <Layers className="w-3 h-3 text-[#111111]" />
                  {categoryLabel}
                </span>
              </div>

              <div>
                <span className="block text-[10px] text-[#777777] uppercase tracking-wider">
                  PLATES
                </span>
                <span className="text-[#111111] font-medium block mt-1">
                  {allImages.length} Sheets
                </span>
              </div>
            </div>

            {/* Concept Brief & Architectural Narrative */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111]">
                {t('modal.overview')}
              </h3>
              <p className="text-[#444444] text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                {description}
              </p>
            </div>

            {/* Gallery of Project Plates & Drawings */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111]">
                    {t('modal.drawings')}
                  </h3>
                  <span className="text-xs font-mono text-[#777777]">
                    Click sheet to inspect
                  </span>
                </div>

                <ImageGallery
                  images={project.gallery}
                  projectTitle={title}
                  category={project.category}
                  onSelectImage={(idx) => onOpenLightbox(project, idx + 1)}
                />
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="p-4 sm:p-6 border-t border-[#E5E5E5] shrink-0 bg-[#F8F7F4] flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xs text-xs font-medium text-[#555555] hover:text-[#111111] hover:bg-white transition-colors border border-[#E5E5E5]"
            >
              {t('modal.closeModal')}
            </button>

            <button
              onClick={handleInquire}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xs text-xs font-medium bg-[#111111] text-white hover:bg-[#333333] transition-colors"
            >
              <span>{t('modal.contactAboutProject')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
