import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Copy, Check } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import siteConfig from '../../data/siteConfig.json';

export default function Contact() {
  const { t, getLocalized } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Architectural Design',
    message: '',
  });

  const [copiedKey, setCopiedKey] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const showNotification = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  // WhatsApp Action
  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const text = `*New Architectural Inquiry — Haya Asaad Portfolio*
• *Name:* ${formData.name || 'Not provided'}
• *Email:* ${formData.email || 'Not provided'}
• *Phone:* ${formData.phone || 'Not provided'}
• *Service:* ${formData.service}
• *Message:*
${formData.message || 'I would like to discuss an architectural project.'}`;

    const url = `https://wa.me/${siteConfig.contact.phoneRaw}?text=${encodeURIComponent(text)}`;
    showNotification(t('contact.feedback.openingApp'));
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Email Action
  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service} — ${formData.name || 'Client'}`);
    const body = encodeURIComponent(`Hello Haya,

I would like to inquire about an architectural collaboration.

Details:
Name: ${formData.name || 'N/A'}
Phone: ${formData.phone || 'N/A'}
Email: ${formData.email || 'N/A'}
Service: ${formData.service}

Project Concept / Message:
${formData.message || 'Looking forward to hearing from you.'}

Best regards,
${formData.name || ''}`);

    showNotification(t('contact.feedback.openingApp'));
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  const services = t('contact.form.serviceOptions') || [];

  return (
    <section id="contact" className="relative py-24 border-t border-white/10 bg-[#0c0c0e]">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 arch-grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#c5a880] bg-[#18181b] border border-white/10">
            {t('contact.badge')}
          </span>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t('contact.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Floating feedback toast */}
        {feedbackMsg && (
          <div className="fixed bottom-6 end-6 z-50 px-4 py-2.5 rounded-xl bg-[#c5a880] text-black font-semibold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif-title text-2xl font-bold text-white border-b border-white/10 pb-4">
              Direct Communication
            </h3>

            {/* Direct Cards */}
            <div className="space-y-4">
              {/* WhatsApp Card */}
              <div className="p-5 rounded-2xl bg-[#121215] border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#71717a] block">
                      {t('contact.whatsappLabel')}
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {siteConfig.contact.phone}
                    </span>
                  </div>
                </div>

                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500 hover:text-black transition-colors"
                >
                  Chat
                </a>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-[#121215] border border-white/10 hover:border-[#c5a880]/40 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a880]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#71717a] block">
                      {t('contact.phoneLabel')}
                    </span>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-sm font-semibold text-white group-hover:text-[#c5a880] transition-colors dir-ltr block"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(siteConfig.contact.phone, 'phone')}
                  title="Copy Phone"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#a1a1aa] hover:text-white transition-colors"
                >
                  {copiedKey === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-[#121215] border border-white/10 hover:border-[#c5a880]/40 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a880]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#71717a] block">
                      {t('contact.emailLabel')}
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-sm font-semibold text-white group-hover:text-[#c5a880] transition-colors block"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(siteConfig.contact.email, 'email')}
                  title="Copy Email"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#a1a1aa] hover:text-white transition-colors"
                >
                  {copiedKey === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Address Card */}
              <div className="p-5 rounded-2xl bg-[#121215] border border-white/10 hover:border-[#c5a880]/40 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a880]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#71717a] block">
                      {t('contact.studioLabel')}
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      {getLocalized(siteConfig.contact.address)}
                    </span>
                  </div>
                </div>

                <a
                  href={siteConfig.contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-colors"
                >
                  Map
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121215] border border-white/10 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-serif-title text-2xl font-bold text-white">
                  {t('contact.form.title')}
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-1">
                  Choose to send directly via WhatsApp or your preferred email application.
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#a1a1aa] mb-1.5">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact.form.namePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a1a1aa] mb-1.5">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('contact.form.phonePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#a1a1aa] mb-1.5">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a1a1aa] mb-1.5">
                      {t('contact.form.service')}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 text-white text-sm focus:outline-none focus:border-[#c5a880]"
                    >
                      {Array.isArray(services) &&
                        services.map((srv, idx) => (
                          <option key={idx} value={srv}>
                            {srv}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a1a1aa] mb-1.5">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#c5a880]"
                  ></textarea>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t('contact.form.submitWhatsApp')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#c5a880] hover:bg-[#d8bfa0] text-black font-semibold text-xs shadow-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('contact.form.submitEmail')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
