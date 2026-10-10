import React from 'react';
import ArchitecturalImage from './ArchitecturalImage';
import { Maximize2 } from 'lucide-react';

export default function ImageGallery({
  images = [],
  onSelectImage,
  projectTitle = '',
  category = '',
}) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img, idx) => (
        <div
          key={img + idx}
          onClick={() => onSelectImage(idx)}
          className="group relative aspect-[4/3] rounded-none overflow-hidden border border-[#E5E5E5] bg-[#F4F4F1] cursor-pointer hover:border-[#111111] transition-colors"
        >
          <ArchitecturalImage
            src={img}
            alt={`${projectTitle} plate ${idx + 1}`}
            category={category}
            title={`${projectTitle} - Sheet 0${idx + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <span className="p-2.5 bg-[#111111] text-white">
              <Maximize2 className="w-4 h-4" />
            </span>
          </div>

          <span className="absolute bottom-2 start-2 font-mono text-[9px] px-2 py-0.5 bg-white/95 text-[#111111] border border-[#E5E5E5]">
            SHEET #{String(idx + 1).padStart(2, '0')}
          </span>
        </div>
      ))}
    </div>
  );
}
