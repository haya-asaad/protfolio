import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function Hero({ totalProjects = 11 }) {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 bg-[#FAF9F6]"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        {/* Minimalist Editorial Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F4F1] border border-[#E5E5E5] text-xs font-mono font-medium tracking-widest text-[#333333] uppercase"
        >
          <span>{t('hero.badge')}</span>
        </motion.div>

        {/* Studio Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs sm:text-sm font-mono font-medium tracking-widest text-[#444444] uppercase"
        >
          {t('hero.tagline')} • TEL AVIV
        </motion.p>

        {/* Sharp Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] leading-[1.08] max-w-3xl mx-auto"
        >
          {t('hero.headline')}
        </motion.h1>

        {/* Generous Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg text-[#333333] max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {t('hero.description')}
        </motion.p>

        {/* Gallery-Grade Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a
            href="#works"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-[#111111] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#333333] transition-colors"
          >
            <span>{t('hero.ctaProjects')}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-transparent text-[#111111] border border-[#111111] font-medium text-xs uppercase tracking-wider hover:bg-[#111111] hover:text-white transition-colors"
          >
            <span>{t('hero.ctaContact')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Editorial Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid grid-cols-3 gap-6 pt-12 max-w-xl mx-auto border-t border-[#E5E5E5]"
        >
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-serif-title font-bold text-[#111111]">
              {totalProjects}
            </span>
            <span className="block text-xs font-mono font-medium text-[#444444] mt-1 uppercase tracking-wider">
              {t('hero.metrics.projects')}
            </span>
          </div>

          <div className="text-center border-x border-[#E5E5E5] px-2">
            <span className="block text-2xl sm:text-3xl font-serif-title font-bold text-[#111111]">
              TAU
            </span>
            <span className="block text-xs font-mono font-medium text-[#444444] mt-1 uppercase tracking-wider">
              {t('hero.metrics.education')}
            </span>
          </div>

          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-serif-title font-bold text-[#111111]">
              BIM
            </span>
            <span className="block text-xs font-mono font-medium text-[#444444] mt-1 uppercase tracking-wider">
              Revit / Rhino
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
