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
          className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#18181b] cursor-pointer hover:border-[#c5a880]/50 transition-all duration-300 shadow-md"
        >
          <ArchitecturalImage
            src={img}
            alt={`${projectTitle} plate ${idx + 1}`}
            category={category}
            title={`${projectTitle} - Sheet 0${idx + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="p-2.5 rounded-full bg-black/70 border border-white/20 text-[#c5a880]">
              <Maximize2 className="w-4 h-4" />
            </span>
          </div>

          <span className="absolute bottom-2 start-2 font-mono text-[9px] px-2 py-0.5 rounded bg-black/70 text-white/80 border border-white/10">
            SHEET #{String(idx + 1).padStart(2, '0')}
          </span>
        </div>
      ))}
    </div>
  );
}
