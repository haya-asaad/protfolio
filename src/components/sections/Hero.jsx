import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Award, Compass, Layers } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function Hero({ totalProjects = 11 }) {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden arch-grid-bg"
    >
      {/* Subtle radial glow accent */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Architectural Axis Lines */}
      <div className="absolute inset-y-0 start-8 sm:start-16 border-s border-white/[0.04] pointer-events-none hidden sm:block" />
      <div className="absolute inset-y-0 end-8 sm:end-16 border-e border-white/[0.04] pointer-events-none hidden sm:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Credentials Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18181b]/80 border border-white/10 text-xs font-mono text-[#c5a880] backdrop-blur-md shadow-sm"
        >
          <Award className="w-3.5 h-3.5 text-[#c5a880]" />
          <span>{t('hero.badge')}</span>
        </motion.div>

        {/* Studio Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs sm:text-sm font-mono tracking-widest text-[#a1a1aa] uppercase"
        >
          {t('hero.tagline')} • TEL AVIV
        </motion.p>

        {/* Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto"
        >
          {t('hero.headline')}
        </motion.h1>

        {/* Architectural Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed"
        >
          {t('hero.description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <a
            href="#works"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#c5a880] text-black font-semibold text-sm hover:bg-[#d8bfa0] transition-all duration-200 shadow-lg shadow-[#c5a880]/20 hover:scale-105 active:scale-95"
          >
            <span>{t('hero.ctaProjects')}</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#18181b] text-white border border-white/10 font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200 active:scale-95"
          >
            <span>{t('hero.ctaContact')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-3 gap-4 pt-12 max-w-xl mx-auto border-t border-white/10"
        >
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-serif-title font-bold text-white">
              {totalProjects}
            </span>
            <span className="block text-[11px] sm:text-xs font-mono text-[#71717a] mt-1">
              {t('hero.metrics.projects')}
            </span>
          </div>

          <div className="text-center border-x border-white/10 px-2">
            <span className="block text-2xl sm:text-3xl font-serif-title font-bold text-[#c5a880]">
              TAU
            </span>
            <span className="block text-[11px] sm:text-xs font-mono text-[#71717a] mt-1">
              {t('hero.metrics.education')}
            </span>
          </div>

          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-serif-title font-bold text-white">
              BIM
            </span>
            <span className="block text-[11px] sm:text-xs font-mono text-[#71717a] mt-1">
              Revit / Rhino
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating coordinates indicator */}
      <div className="absolute bottom-6 start-8 sm:start-12 hidden lg:flex items-center gap-2 font-mono text-[10px] text-[#71717a] tracking-widest uppercase">
        <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
        <span>TEL AVIV • 32.0853° N, 34.7818° E</span>
      </div>

      <div className="absolute bottom-6 end-8 sm:end-12 hidden lg:flex items-center gap-2 font-mono text-[10px] text-[#71717a] tracking-widest uppercase">
        <Layers className="w-3.5 h-3.5 text-[#c5a880]" />
        <span>B.ARCH ARCHITECTURAL ARCHIVE</span>
      </div>
    </section>
  );
}
