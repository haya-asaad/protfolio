import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import siteConfig from '../../data/siteConfig.json';

export default function MobileNav({ isOpen, onClose }) {
  const { t } = useTranslation();

  const navLinks = [
    { href: '#hero', label: t('nav.home') },
    { href: '#works', label: t('nav.works') },
    { href: '#studio', label: t('nav.studio') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const handleLinkClick = (href) => {
    onClose();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#FAF9F6] flex flex-col justify-between p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
            <div>
              <span className="font-serif-title text-xl font-bold tracking-wider text-[#111111]">
                {t('nav.brand')}
              </span>
              <p className="text-[10px] tracking-widest text-[#444444] font-medium uppercase font-mono">
                {t('nav.brandSub')}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2.5 rounded-sm bg-[#F4F4F1] border border-[#E5E5E5] text-[#111111] hover:bg-[#EFEFEA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation items */}
          <div className="flex flex-col gap-6 my-auto">
            {navLinks.map((link, idx) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * idx }}
                onClick={() => handleLinkClick(link.href)}
                className="text-start flex items-center justify-between text-2xl font-serif-title font-medium text-[#111111] hover:text-[#555555] transition-colors py-3 border-b border-[#EAEAE6]"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#888888]">0{idx + 1}</span>
              </motion.button>
            ))}
          </div>

          {/* Footer with language switch and direct actions */}
          <div className="space-y-6 pt-4 border-t border-[#E5E5E5]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#444444] font-mono font-medium uppercase tracking-wider">
                {t('nav.switchLang')}
              </span>
              <LanguageSwitcher />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-[#111111] text-white text-xs font-medium hover:bg-[#333333] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-white border border-[#E5E5E5] text-[#111111] text-xs font-medium hover:bg-[#F4F4F1] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
