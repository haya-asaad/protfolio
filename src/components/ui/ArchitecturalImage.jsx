import React, { useState } from 'react';
import { Compass, Maximize2 } from 'lucide-react';

export default function ArchitecturalImage({
  src,
  alt = 'Architectural project image',
  className = '',
  category = 'architecture',
  title = '',
  onClick,
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If image fails to load or hasn't loaded yet, we show this ultra-refined architectural blueprint fallback
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-[#141417] select-none ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      ) : null}

      {/* Elegant Fallback or Preload Wireframe */}
      {(!isLoaded || hasError) && (
        <div className={`absolute inset-0 flex flex-col justify-between p-6 bg-[#121215] border border-white/5 ${hasError ? 'opacity-100' : 'opacity-40 animate-pulse'}`}>
          {/* Subtle blueprint grid */}
          <div className="absolute inset-0 arch-grid-bg opacity-40 pointer-events-none" />

          {/* Top header markings */}
          <div className="relative z-10 flex items-center justify-between text-[10px] tracking-widest text-[#a1a1aa]/60 uppercase font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]/60 inline-block" />
              {category}
            </span>
            <span className="flex items-center gap-1">
              <Compass className="w-3 h-3 text-[#c5a880]" />
              N 32°06' E 34°48'
            </span>
          </div>

          {/* Center architectural isometric crosshair */}
          <div className="relative z-10 my-auto text-center py-8">
            <div className="relative inline-block mx-auto mb-3">
              <svg className="w-16 h-16 text-[#c5a880]/40 mx-auto" viewBox="0 0 64 64" fill="none" stroke="currentColor">
                <rect x="12" y="12" width="40" height="40" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M12 32 H52 M32 12 V52" strokeWidth="0.75" />
                <path d="M22 22 L42 42 M22 42 L42 22" strokeWidth="0.5" strokeOpacity="0.5" />
                <circle cx="32" cy="32" r="3" fill="#c5a880" fillOpacity="0.6" />
              </svg>
            </div>
            {title && (
              <p className="text-xs font-medium text-[#d4d4d8] tracking-wide max-w-[80%] mx-auto truncate">
                {title}
              </p>
            )}
            <p className="text-[10px] font-mono text-[#71717a] mt-1">
              Architectural Render & Plate
            </p>
          </div>

          {/* Bottom dimension markers */}
          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-[#71717a] border-t border-white/5 pt-2">
            <span>SCALE 1:100</span>
            <span className="text-[#c5a880]/70">REF // {category.toUpperCase()}</span>
            <span>REVIT / BIM</span>
          </div>

          {/* Corner crosshairs */}
          <span className="absolute top-2 start-2 text-white/20 font-mono text-[9px]">+</span>
          <span className="absolute top-2 end-2 text-white/20 font-mono text-[9px]">+</span>
          <span className="absolute bottom-2 start-2 text-white/20 font-mono text-[9px]">+</span>
          <span className="absolute bottom-2 end-2 text-white/20 font-mono text-[9px]">+</span>
        </div>
      )}

      {/* Subtle hover overlay for clickable images */}
      {onClick && isLoaded && !hasError && (
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xl transform scale-90 hover:scale-100 transition-transform">
            <Maximize2 className="w-5 h-5" />
          </span>
        </div>
      )}
    </div>
  );
}
