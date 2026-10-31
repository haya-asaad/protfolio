import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import FilterPills from '../ui/FilterPills';
import ProjectCard from '../ui/ProjectCard';

const CATEGORIES = ['all', 'residential', 'urban', 'civic', 'technology', 'drawings'];

export default function ProjectGrid({
  projects = [],
  onOpenDetails,
  onOpenLightbox,
}) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryCounts = useMemo(() => {
    const counts = { all: projects.length };
    projects.forEach((proj) => {
      const cat = proj.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section id="works" className="relative py-24 border-t border-[#E5E5E5] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-mono font-medium uppercase tracking-widest text-[#333333] bg-[#F4F4F1] border border-[#E5E5E5]">
            {t('portfolio.badge')}
          </span>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight">
            {t('portfolio.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Filter Pills */}
        <FilterPills
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          categoryCounts={categoryCounts}
        />

        {/* Counter Bar */}
        <div className="flex items-center justify-between text-xs font-mono font-medium text-[#444444] border-b border-[#E5E5E5] pb-3">
          <span>
            CATALOGUE: {filteredProjects.length} OF {projects.length} {t('portfolio.itemsCount').toUpperCase()}
          </span>
          <span className="text-[#111111] uppercase">
            TYPOLOGY // {activeCategory}
          </span>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onOpenDetails={onOpenDetails}
                  onOpenLightbox={onOpenLightbox}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
