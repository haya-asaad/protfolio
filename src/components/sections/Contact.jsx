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
    <section id="contact" className="relative py-24 border-t border-[#E5E5E5] bg-[#FAF9F6]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-widest text-[#777777] bg-white border border-[#E5E5E5]">
            {t('contact.badge')}
          </span>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight">
            {t('contact.title')}
          </h2>

          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Floating feedback toast */}
        {feedbackMsg && (
          <div className="fixed bottom-6 end-6 z-50 px-4 py-2.5 bg-[#111111] text-white font-medium text-xs shadow-lg flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif-title text-2xl font-bold text-[#111111] border-b border-[#E5E5E5] pb-4">
              Direct Communication
            </h3>

            <div className="space-y-4">
              {/* WhatsApp Card */}
              <div className="p-5 bg-white border border-[#E5E5E5] hover:border-[#111111] transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F4F4F1] border border-[#E5E5E5] flex items-center justify-center text-[#111111]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#777777] block uppercase tracking-wider">
                      {t('contact.whatsappLabel')}
                    </span>
                    <span className="text-sm font-semibold text-[#111111]">
                      {siteConfig.contact.phone}
                    </span>
                  </div>
                </div>

                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 text-xs font-medium bg-[#111111] text-white hover:bg-[#333333] transition-colors"
                >
                  Chat
                </a>
              </div>

              {/* Phone Card */}
              <div className="p-5 bg-white border border-[#E5E5E5] hover:border-[#111111] transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F4F4F1] border border-[#E5E5E5] flex items-center justify-center text-[#111111]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#777777] block uppercase tracking-wider">
                      {t('contact.phoneLabel')}
                    </span>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-sm font-semibold text-[#111111] hover:text-[#555555] transition-colors dir-ltr block"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(siteConfig.contact.phone, 'phone')}
                  title="Copy Phone"
                  className="p-2 bg-[#F4F4F1] border border-[#E5E5E5] hover:bg-[#111111] text-[#111111] hover:text-white transition-colors"
                >
                  {copiedKey === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Email Card */}
              <div className="p-5 bg-white border border-[#E5E5E5] hover:border-[#111111] transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F4F4F1] border border-[#E5E5E5] flex items-center justify-center text-[#111111]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#777777] block uppercase tracking-wider">
                      {t('contact.emailLabel')}
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-sm font-semibold text-[#111111] hover:text-[#555555] transition-colors block"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(siteConfig.contact.email, 'email')}
                  title="Copy Email"
                  className="p-2 bg-[#F4F4F1] border border-[#E5E5E5] hover:bg-[#111111] text-[#111111] hover:text-white transition-colors"
                >
                  {copiedKey === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Address Card */}
              <div className="p-5 bg-white border border-[#E5E5E5] hover:border-[#111111] transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F4F4F1] border border-[#E5E5E5] flex items-center justify-center text-[#111111]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#777777] block uppercase tracking-wider">
                      {t('contact.studioLabel')}
                    </span>
                    <span className="text-sm font-semibold text-[#111111] block">
                      {getLocalized(siteConfig.contact.address)}
                    </span>
                  </div>
                </div>

                <a
                  href={siteConfig.contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 text-xs font-medium bg-[#F4F4F1] border border-[#E5E5E5] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                >
                  Map
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-white border border-[#E5E5E5] space-y-6">
              <div className="border-b border-[#E5E5E5] pb-4">
                <h3 className="font-serif-title text-2xl font-bold text-[#111111]">
                  {t('contact.form.title')}
                </h3>
                <p className="text-xs text-[#555555] mt-1">
                  Choose to send directly via WhatsApp or your preferred email application.
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#555555] uppercase tracking-wider mb-1.5">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact.form.namePlaceholder')}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E5E5] text-[#111111] placeholder-[#999999] text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#555555] uppercase tracking-wider mb-1.5">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('contact.form.phonePlaceholder')}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E5E5] text-[#111111] placeholder-[#999999] text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#555555] uppercase tracking-wider mb-1.5">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E5E5] text-[#111111] placeholder-[#999999] text-sm focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#555555] uppercase tracking-wider mb-1.5">
                      {t('contact.form.service')}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E5E5] text-[#111111] text-sm focus:outline-none focus:border-[#111111]"
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
                  <label className="block text-xs font-mono text-[#555555] uppercase tracking-wider mb-1.5">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E5E5E5] text-[#111111] placeholder-[#999999] text-sm focus:outline-none focus:border-[#111111]"
                  ></textarea>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#111111] hover:bg-[#333333] text-white font-medium text-xs uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t('contact.form.submitWhatsApp')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-transparent hover:bg-[#111111] hover:text-white text-[#111111] border border-[#111111] font-medium text-xs uppercase tracking-wider transition-colors"
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
