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
    <footer className="relative bg-[#F4F4F1] border-t border-[#E5E5E5] pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#E5E5E5]">
          {/* Col 1: Brand & Bio Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#111111] text-white flex items-center justify-center">
                <span className="font-mono text-xs font-semibold">HA</span>
              </div>
              <div>
                <h3 className="font-serif-title text-lg font-bold text-[#111111] tracking-wide">
                  {t('nav.brand')}
                </h3>
                <p className="text-[10px] tracking-widest text-[#444444] font-medium uppercase font-mono">
                  {t('nav.brandSub')}
                </p>
              </div>
            </div>

            <p className="text-[#333333] max-w-md text-xs leading-relaxed">
              {t('about.lead')}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white border border-[#E5E5E5] text-[11px] text-[#111111] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              {getLocalized(siteConfig.degree)}
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-xs font-mono font-medium uppercase tracking-widest text-[#444444] mb-4">
              {t('footer.quickNav')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#333333]">
              <li>
                <a href="#hero" className="hover:text-[#111111] transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-[#111111] transition-colors">
                  {t('nav.studio')}
                </a>
              </li>
              <li>
                <a href="#works" className="hover:text-[#111111] transition-colors">
                  {t('nav.works')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#111111] transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Studio Info */}
          <div>
            <h4 className="text-xs font-mono font-medium uppercase tracking-widest text-[#444444] mb-4">
              {t('contact.title')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#333333]">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>{getLocalized(siteConfig.contact.address)}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} dir="ltr" className="hover:text-[#111111] transition-colors dir-ltr inline-block">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#111111] transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-[#111111] transition-colors">
                  WhatsApp Direct
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#444444]">
          <p>© {CURRENT_YEAR} {t('footer.brandText')} {t('footer.rights')}</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white border border-[#E5E5E5] hover:border-[#111111] text-[#111111] transition-colors"
            aria-label="Scroll back to top"
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#111111]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
