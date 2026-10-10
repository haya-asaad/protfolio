import { GraduationCap, Building2, Map, Home, Cpu, Quote } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import ArchitecturalImage from '../ui/ArchitecturalImage';

const SOFTWARE_STACK = [
  { name: 'Autodesk Revit', category: 'BIM & Production', level: 'Advanced' },
  { name: 'AutoCAD', category: '2D Drafting', level: 'Advanced' },
  { name: 'Rhinoceros 3D', category: 'Parametric & Modeling', level: 'Advanced' },
  { name: 'Enscape', category: 'Real-Time Render', level: 'Advanced' },
  { name: 'Lumion', category: 'Atmospheric Renders', level: 'Advanced' },
  { name: 'Twinmotion', category: 'Cinematic Visualization', level: 'Proficient' },
  { name: 'Adobe InDesign', category: 'Editorial & Portfolios', level: 'Advanced' },
  { name: 'Adobe Illustrator', category: 'Vector & Diagrams', level: 'Advanced' },
  { name: 'Adobe Photoshop', category: 'Post-Production', level: 'Advanced' },
  { name: 'Morpholio Trace', category: 'Concept Drafting', level: 'Proficient' },
  { name: 'Procreate', category: 'Digital Sketching', level: 'Proficient' },
  { name: 'Microsoft Office', category: 'Documentation', level: 'Proficient' },
];

export default function About() {
  const { t } = useTranslation();

  const pillars = t('about.pillars') || [];
  const education = t('about.education') || [];

  const pillarIcons = [
    <Building2 key="bld" className="w-5 h-5 text-[#c5a880]" />,
    <Map key="map" className="w-5 h-5 text-[#c5a880]" />,
    <Home key="home" className="w-5 h-5 text-[#c5a880]" />,
  ];

  return (
    <section id="studio" className="relative py-24 border-t border-white/10 bg-[#09090b]">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 arch-grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#c5a880] bg-[#18181b] border border-white/10">
            {t('about.badge')}
          </span>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t('about.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Bio Grid: Portrait + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Photo Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#141417] group">
              <ArchitecturalImage
                src="./images/profile/bio.jpg"
                alt="Haya Asaad Portrait"
                category="Architect"
                title="Haya Asaad, B.Arch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Decorative architectural borders */}
              <div className="absolute inset-4 border border-white/10 pointer-events-none rounded-2xl" />
              <div className="absolute bottom-6 start-6 end-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                <span className="block font-serif-title text-base font-bold text-white">
                  Haya Asaad
                </span>
                <span className="block text-xs font-mono text-[#c5a880] mt-0.5">
                  B.Arch — Tel-Aviv University
                </span>
              </div>
            </div>

            {/* Background accent block */}
            <div className="absolute -bottom-4 -end-4 w-full h-full border border-[#c5a880]/20 rounded-3xl -z-10 hidden sm:block" />
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl font-medium text-white leading-relaxed font-serif-title">
              {t('about.lead')}
            </p>

            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
              {t('about.body')}
            </p>

            {/* Philosophy Callout Quote */}
            <div className="p-6 rounded-2xl bg-[#18181b]/80 border border-white/10 relative overflow-hidden">
              <Quote className="absolute top-4 end-4 w-10 h-10 text-[#c5a880]/10" />
              <p className="text-sm sm:text-base italic font-serif-title text-[#e4e4e7] leading-relaxed relative z-10">
                "{t('about.quote')}"
              </p>
              <span className="block text-xs font-mono text-[#c5a880] mt-3 uppercase tracking-wider">
                — Architectural Manifesto
              </span>
            </div>
          </div>
        </div>

        {/* Core Architectural Pillars */}
        <div className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-serif-title text-2xl font-bold text-white">
              {t('about.pillarsTitle')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.isArray(pillars) &&
              pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#121215] border border-white/10 hover:border-[#c5a880]/40 transition-all duration-300 space-y-3 shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {pillarIcons[idx] || <Building2 className="w-5 h-5 text-[#c5a880]" />}
                  </div>
                  <div>
                    <h4 className="font-serif-title text-lg font-bold text-white">
                      {pillar.title}
                    </h4>
                    <span className="text-xs font-mono text-[#c5a880] block mt-0.5">
                      {pillar.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <h3 className="font-serif-title text-2xl font-bold text-white">
              {t('about.educationTitle')}
            </h3>
            <span className="text-xs font-mono text-[#c5a880]">
              2014 — 2025
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(education) &&
              education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#121215] border border-white/10 relative space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 font-semibold">
                      {edu.period}
                    </span>
                    <span className="text-[#71717a] flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-[#c5a880]" />
                      Accredited
                    </span>
                  </div>

                  <h4 className="font-serif-title text-lg font-bold text-white">
                    {edu.degree}
                  </h4>

                  <p className="text-xs font-medium text-[#c5a880]">
                    {edu.school}
                  </p>

                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {edu.desc}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Software & Technical Arsenal */}
        <div className="space-y-8 pt-4">
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-serif-title text-2xl font-bold text-white">
              {t('about.softwareTitle')}
            </h3>
            <p className="text-xs text-[#a1a1aa] mt-1">
              {t('about.softwareSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {SOFTWARE_STACK.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#121215] border border-white/5 hover:border-[#c5a880]/40 transition-all text-center space-y-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto flex items-center justify-center text-[#c5a880] group-hover:scale-110 transition-transform">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="block text-xs font-medium text-white truncate">
                  {item.name}
                </span>
                <span className="block text-[10px] font-mono text-[#71717a] truncate">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
