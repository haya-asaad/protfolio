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
        className={`fixed top-0 start-0 end-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0c0e]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#hero"
            className="group flex items-center gap-3 text-start focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-[#18181b] border border-white/10 flex items-center justify-center text-[#c5a880] group-hover:border-[#c5a880]/50 transition-colors shadow-inner">
              <span className="font-mono text-sm font-semibold tracking-wider">HA</span>
            </div>
            <div>
              <span className="font-serif-title text-base sm:text-lg font-bold tracking-wide text-white block leading-tight">
                {t('nav.brand')}
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest text-[#a1a1aa] uppercase font-mono block">
                {t('nav.brandSub')}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#a1a1aa]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-0 after:h-[1.5px] after:bg-[#c5a880] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Area: Language Switcher + Inquire CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <LanguageSwitcher />

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[#c5a880] text-black hover:bg-[#d8bfa0] transition-colors shadow-md hover:shadow-lg hover:shadow-[#c5a880]/20"
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
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
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
