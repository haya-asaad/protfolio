import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import ArchitecturalImage from './ArchitecturalImage';

export default function LightboxModal({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  onIndexChange,
  projectTitle = '',
  category = '',
}) {
  const { t, isRTL } = useTranslation();

  const total = images.length;

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    onIndexChange((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onIndexChange]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    onIndexChange((currentIndex + 1) % total);
  }, [currentIndex, total, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (isRTL) handleNext();
        else handlePrev();
      } else if (e.key === 'ArrowRight') {
        if (isRTL) handlePrev();
        else handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext, isRTL]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#FAF9F6]/98 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Architectural image inspection lightbox"
      >
        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#E5E5E5] pb-4">
          <div>
            <h4 className="text-sm font-medium text-[#111111] truncate max-w-xs sm:max-w-md">
              {projectTitle}
            </h4>
            <p className="text-[11px] font-mono text-[#777777] uppercase tracking-wider">
              {t('modal.imageCounter', { current: currentIndex + 1, total })}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label={t('modal.close')}
            className="p-2 rounded-xs bg-white hover:bg-[#EFEFEA] text-[#111111] transition-colors border border-[#E5E5E5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Image Viewport with Previous/Next Controls */}
        <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
          {/* Previous Button */}
          {total > 1 && (
            <button
              onClick={handlePrev}
              aria-label={t('modal.prev')}
              className="absolute start-2 sm:start-6 z-20 p-3 rounded-xs bg-white hover:bg-[#111111] text-[#111111] hover:text-white border border-[#E5E5E5] transition-colors shadow-sm"
            >
              {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          )}

          {/* Active Image container */}
          <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
            <ArchitecturalImage
              key={currentImage}
              src={currentImage}
              alt={`${projectTitle} - view ${currentIndex + 1}`}
              category={category}
              title={`${projectTitle} (${currentIndex + 1}/${total})`}
              className="max-h-[75vh] max-w-full rounded-none object-contain border border-[#E5E5E5] shadow-sm"
            />
          </div>

          {/* Next Button */}
          {total > 1 && (
            <button
              onClick={handleNext}
              aria-label={t('modal.next')}
              className="absolute end-2 sm:end-6 z-20 p-3 rounded-xs bg-white hover:bg-[#111111] text-[#111111] hover:text-white border border-[#E5E5E5] transition-colors shadow-sm"
            >
              {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        {total > 1 && (
          <div className="relative z-10 flex items-center justify-center gap-2 overflow-x-auto py-2 border-t border-[#E5E5E5] max-w-2xl mx-auto w-full">
            {images.map((img, idx) => (
              <button
                key={img + idx}
                onClick={() => onIndexChange(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`relative w-14 h-10 overflow-hidden shrink-0 border transition-all ${
                  currentIndex === idx
                    ? 'border-[#111111] scale-105'
                    : 'border-[#E5E5E5] opacity-60 hover:opacity-100'
                }`}
              >
                <ArchitecturalImage
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
