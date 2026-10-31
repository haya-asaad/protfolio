import React, { useState, useEffect } from 'react';
import { Menu, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import MobileNav from './MobileNav';

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: t('nav.home') },
    { href: '#works', label: t('nav.works') },
    { href: '#studio', label: t('nav.studio') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 start-0 end-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E5E5] py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
            : 'bg-[#FAF9F6]/80 backdrop-blur-sm py-5 border-b border-[#EAEAE6]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#hero"
            className="group flex items-center gap-3 text-start focus:outline-none"
          >
            <div className="w-9 h-9 rounded-sm bg-[#111111] text-white flex items-center justify-center transition-colors">
              <span className="font-mono text-xs font-semibold tracking-wider">HA</span>
            </div>
            <div>
              <span className="font-serif-title text-base sm:text-lg font-bold tracking-wide text-[#111111] block leading-tight">
                {t('nav.brand')}
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest text-[#444444] font-medium uppercase font-mono block">
                {t('nav.brandSub')}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-medium text-[#333333]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#111111] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-0 after:h-[1px] after:bg-[#111111] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Area: Language Switcher + Inquire CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm text-xs font-medium bg-[#111111] text-white hover:bg-[#333333] transition-colors"
            >
              <span>{t('nav.getInTouch')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher className="scale-90" />
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 rounded-sm bg-[#F4F4F1] border border-[#E5E5E5] text-[#111111] hover:bg-[#EAEAE6] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
