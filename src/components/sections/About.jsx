import { GraduationCap, Building2, Map, Home, Cpu, Quote } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import ArchitecturalImage from '../ui/ArchitecturalImage';

const SOFTWARE_STACK = [
  { name: 'AutoCAD' },
  { name: 'Revit' },
  { name: 'Rhino' },
  { name: 'Enscape' },
  { name: 'Lumion' },
  { name: 'Twinmotion Render' },
  { name: 'Adobe InDesign' },
  { name: 'Adobe Illustrator' },
  { name: 'Adobe Photoshop' },
  { name: 'Microsoft Office' },
  { name: 'Canva' },
  { name: 'Procreate' },
  { name: 'Trace' },
];

export default function About() {
  const { t } = useTranslation();

  const pillars = t('about.pillars') || [];
  const education = t('about.education') || [];

  const pillarIcons = [
    <Building2 key="bld" className="w-5 h-5 text-[#111111]" />,
    <Map key="map" className="w-5 h-5 text-[#111111]" />,
    <Home key="home" className="w-5 h-5 text-[#111111]" />,
  ];

  return (
    <section id="studio" className="relative py-24 border-t border-[#E5E5E5] bg-[#F8F7F4]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-mono font-medium uppercase tracking-widest text-[#333333] bg-white border border-[#E5E5E5]">
            {t('about.badge')}
          </span>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight">
            {t('about.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Bio Grid: Portrait + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Photo Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-none md:rounded-sm overflow-hidden border border-[#E5E5E5] bg-white group">
              <ArchitecturalImage
                src="./images/profile/me.JPG"
                alt="Haya Asaad Portrait"
                category="Architect"
                title="Haya Asaad, B.Arch"
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              <div className="absolute bottom-4 start-4 end-4 p-4 bg-white/95 border border-[#E5E5E5] backdrop-blur-sm">
                <span className="block font-serif-title text-base font-bold text-[#111111]">
                  Haya Asaad
                </span>
                <span className="block text-xs font-mono text-[#555555] mt-0.5">
                  B.Arch — Tel-Aviv University
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl font-normal text-[#111111] leading-relaxed font-serif-title">
              {t('about.lead')}
            </p>

            <p className="text-sm sm:text-base text-[#333333] leading-relaxed font-normal">
              {t('about.body')}
            </p>

            {/* Philosophy Callout Quote */}
            <div className="p-6 bg-white border-s-2 border-s-[#111111] border border-[#E5E5E5] relative overflow-hidden">
              <Quote className="absolute top-4 end-4 w-8 h-8 text-[#E5E5E5]" />
              <p className="text-sm sm:text-base italic font-serif-title text-[#222222] leading-relaxed relative z-10">
                "{t('about.quote')}"
              </p>
            </div>
          </div>
        </div>

        {/* Core Architectural Pillars */}
        <div className="space-y-8">
          <div className="border-b border-[#E5E5E5] pb-4">
            <h3 className="font-serif-title text-2xl font-bold text-[#111111]">
              {t('about.pillarsTitle')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.isArray(pillars) &&
              pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-[#E5E5E5] hover:border-[#111111] transition-colors space-y-3"
                >
                  <div className="w-9 h-9 bg-[#F4F4F1] border border-[#E5E5E5] flex items-center justify-center">
                    {pillarIcons[idx] || <Building2 className="w-5 h-5 text-[#111111]" />}
                  </div>
                  <div>
                    <h4 className="font-serif-title text-lg font-bold text-[#111111]">
                      {pillar.title}
                    </h4>
                    <span className="text-xs font-mono font-medium text-[#444444] block mt-0.5 uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>
                  </div>
                  {pillar.desc && (
                    <p className="text-xs text-[#333333] leading-relaxed">
                      {pillar.desc}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8">
          <div className="border-b border-[#E5E5E5] pb-4 flex items-center justify-between">
            <h3 className="font-serif-title text-2xl font-bold text-[#111111]">
              {t('about.educationTitle')}
            </h3>
            <span className="text-xs font-mono font-medium text-[#444444]">
              2014-2025
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(education) &&
              education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-[#E5E5E5] relative space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 bg-[#F4F4F1] text-[#111111] border border-[#E5E5E5] font-medium">
                      {edu.period}
                    </span>
                    <GraduationCap className="w-4 h-4 text-[#111111]" />
                  </div>

                  <h4 className="font-serif-title text-lg font-bold text-[#111111]">
                    {edu.degree}
                  </h4>

                  <p className="text-xs font-semibold text-[#333333]">
                    {edu.school}
                  </p>

                  {edu.desc && (
                    <p className="text-xs text-[#333333] leading-relaxed">
                      {edu.desc}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Software & Technical Arsenal */}
        <div className="space-y-8 pt-4">
          <div className="border-b border-[#E5E5E5] pb-4">
            <h3 className="font-serif-title text-2xl font-bold text-[#111111]">
              {t('about.softwareTitle')}
            </h3>
            {t('about.softwareSubtitle') && (
              <p className="text-xs text-[#555555] mt-1">
                {t('about.softwareSubtitle')}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {SOFTWARE_STACK.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white border border-[#E5E5E5] hover:border-[#111111] transition-colors text-center space-y-1.5"
              >
                <div className="w-7 h-7 bg-[#F4F4F1] mx-auto flex items-center justify-center text-[#111111]">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <span className="block text-xs font-medium text-[#111111] truncate">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
