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

  // Keyboard navigation
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
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Architectural image inspection lightbox"
      >
        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h4 className="text-sm font-medium text-white truncate max-w-xs sm:max-w-md">
              {projectTitle}
            </h4>
            <p className="text-[11px] font-mono text-[#c5a880] uppercase tracking-wider">
              {t('modal.imageCounter', { current: currentIndex + 1, total })}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label={t('modal.close')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
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
              className="absolute start-2 sm:start-6 z-20 p-3 rounded-full bg-black/60 hover:bg-[#c5a880] text-white hover:text-black border border-white/20 transition-all duration-200 backdrop-blur-md shadow-xl"
            >
              {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
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
              className="max-h-[75vh] max-w-full rounded-lg shadow-2xl object-contain border border-white/10"
            />
          </div>

          {/* Next Button */}
          {total > 1 && (
            <button
              onClick={handleNext}
              aria-label={t('modal.next')}
              className="absolute end-2 sm:end-6 z-20 p-3 rounded-full bg-black/60 hover:bg-[#c5a880] text-white hover:text-black border border-white/20 transition-all duration-200 backdrop-blur-md shadow-xl"
            >
              {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        {total > 1 && (
          <div className="relative z-10 flex items-center justify-center gap-2 overflow-x-auto py-2 border-t border-white/10 max-w-2xl mx-auto w-full">
            {images.map((img, idx) => (
              <button
                key={img + idx}
                onClick={() => onIndexChange(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`relative w-14 h-10 rounded-md overflow-hidden shrink-0 border transition-all ${
                  currentIndex === idx
                    ? 'border-[#c5a880] scale-105 shadow-md'
                    : 'border-white/10 opacity-50 hover:opacity-100'
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
