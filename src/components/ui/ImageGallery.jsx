import React from 'react';
import ArchitecturalImage from './ArchitecturalImage';
import { Maximize2, Images } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function ImageGallery({
  images = [],
  onSelectImage,
  onSelectSubGallery,
  projectTitle = '',
  category = '',
}) {
  const { getLocalized } = useTranslation();

  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((item, idx) => {
        const isSubGallery = typeof item === 'object' && item !== null && Array.isArray(item.images);
        const imgSrc = isSubGallery ? item.coverImage || item.images[0] : item;
        const itemTitle = isSubGallery
          ? getLocalized(item.title)
          : `${projectTitle} - Sheet 0${idx + 1}`;
        const subCount = isSubGallery ? item.images.length : 0;

        const handleClick = () => {
          if (isSubGallery && onSelectSubGallery) {
            onSelectSubGallery(item);
          } else if (onSelectImage) {
            onSelectImage(idx, item);
          }
        };

        return (
          <div
            key={(item?.id || imgSrc) + idx}
            onClick={handleClick}
            className="group relative aspect-[4/3] rounded-none overflow-hidden border border-[#E5E5E5] bg-[#F4F4F1] cursor-pointer hover:border-[#111111] transition-colors flex flex-col"
          >
            <ArchitecturalImage
              src={imgSrc}
              alt={itemTitle || `${projectTitle} plate ${idx + 1}`}
              category={category}
              title={itemTitle}
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <span className="p-2.5 bg-[#111111] text-white flex items-center gap-1.5 text-xs font-mono">
                {isSubGallery ? (
                  <>
                    <Images className="w-4 h-4" />
                    <span>{subCount}</span>
                  </>
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </span>
            </div>

            {isSubGallery ? (
              <>
                <span className="absolute top-2 end-2 inline-flex items-center gap-1 font-mono text-[10px] font-medium px-2 py-0.5 bg-white/95 text-[#111111] border border-[#E5E5E5]">
                  <Images className="w-3 h-3" />
                  <span>{subCount}</span>
                </span>
                <div className="absolute bottom-0 inset-x-0 p-2.5 bg-white/95 border-t border-[#E5E5E5]">
                  <span className="block text-xs font-medium text-[#111111] truncate">
                    {itemTitle}
                  </span>
                </div>
              </>
            ) : (
              <span className="absolute bottom-2 start-2 font-mono text-[9px] px-2 py-0.5 bg-white/95 text-[#111111] border border-[#E5E5E5]">
                SHEET #{String(idx + 1).padStart(2, '0')}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
