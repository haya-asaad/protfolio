import React, { useState } from 'react';
import { Compass, Maximize2 } from 'lucide-react';

export default function ArchitecturalImage({
  src,
  alt = 'Architectural project plate',
  className = '',
  category = 'architecture',
  title = '',
  onClick,
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-[#F4F4F1] border border-[#E8E8E4] select-none ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}

      {/* Clean Gallery Fallback Plate */}
      {(!isLoaded || hasError) && (
        <div className={`absolute inset-0 flex flex-col justify-between p-6 bg-[#F8F7F4] ${hasError ? 'opacity-100' : 'opacity-60'}`}>
          {/* Top header markings */}
          <div className="relative z-10 flex items-center justify-between text-[10px] tracking-widest text-[#777777] uppercase font-mono border-b border-[#E8E8E4] pb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#111111] inline-block" />
              {category}
            </span>
            <span className="flex items-center gap-1">
              <Compass className="w-3 h-3 text-[#111111]" />
              PLATE // REF
            </span>
          </div>

          {/* Center architectural elevation wireframe */}
          <div className="relative z-10 my-auto text-center py-6">
            <div className="relative inline-block mx-auto mb-2">
              <svg className="w-16 h-16 text-[#333333] mx-auto stroke-1" viewBox="0 0 64 64" fill="none" stroke="currentColor">
                <rect x="14" y="14" width="36" height="36" strokeWidth="0.75" />
                <line x1="14" y1="32" x2="50" y2="32" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="32" y1="14" x2="32" y2="50" strokeWidth="0.5" strokeDasharray="2 2" />
                <rect x="22" y="22" width="20" height="20" strokeWidth="0.5" />
              </svg>
            </div>
            {title && (
              <p className="text-xs font-medium text-[#111111] tracking-wide max-w-[85%] mx-auto truncate">
                {title}
              </p>
            )}
            <p className="text-[10px] font-mono text-[#888888] mt-0.5">
              Architectural Drawing &amp; Plate
            </p>
          </div>

          {/* Bottom dimension markers */}
          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-[#888888] border-t border-[#E8E8E4] pt-2">
            <span>SCALE 1:100</span>
            <span className="text-[#111111] uppercase">{category}</span>
            <span>REVIT / CAD</span>
          </div>
        </div>
      )}

      {/* Subtle hover overlay for clickable images */}
      {onClick && isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#111111]/15 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="p-3 bg-[#111111] text-white shadow-sm transition-transform">
            <Maximize2 className="w-4 h-4" />
          </span>
        </div>
      )}
    </div>
  );
}
