import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import siteConfig from '../../data/siteConfig.json';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { t, getLocalized } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#08080a] border-t border-white/10 pt-16 pb-12 overflow-hidden text-sm">
      {/* Background architectural grid */}
      <div className="absolute inset-0 arch-grid-bg opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#18181b] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
                <span className="font-mono text-xs font-bold">HA</span>
              </div>
              <div>
                <h3 className="font-serif-title text-lg font-bold text-white tracking-wide">
                  {t('nav.brand')}
                </h3>
                <p className="text-[10px] tracking-widest text-[#a1a1aa] uppercase font-mono">
                  {t('nav.brandSub')}
                </p>
              </div>
            </div>

            <p className="text-[#a1a1aa] max-w-md text-xs leading-relaxed">
              {t('about.lead')}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#c5a880] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
              {getLocalized(siteConfig.degree)}
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#71717a] mb-4">
              {t('footer.quickNav')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a1a1aa]">
              <li>
                <a href="#hero" className="hover:text-[#c5a880] transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#works" className="hover:text-[#c5a880] transition-colors">
                  {t('nav.works')}
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-[#c5a880] transition-colors">
                  {t('nav.studio')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#c5a880] transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Studio Info */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#71717a] mb-4">
              {t('contact.title')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a1a1aa]">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <span>{getLocalized(siteConfig.contact.address)}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors dir-ltr">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-300 transition-colors">
                  WhatsApp Direct
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <p>© {CURRENT_YEAR} {t('footer.brandText')} {t('footer.rights')}</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#c5a880]/40 text-[#a1a1aa] hover:text-white transition-colors"
            aria-label="Scroll back to top"
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#c5a880]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
