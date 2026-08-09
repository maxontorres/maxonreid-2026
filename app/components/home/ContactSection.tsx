 'use client';

import { Mail, MapPin, Link2, MessageCircle, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('contact.home');

  return (
    <section
      id="contact"
      className="py-24 px-0 w-[92%] max-w-[1200px] mx-auto"
      aria-labelledby="contact-heading"
    >
      <div className="text-center mb-12">
        <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4 font-display uppercase">
          {t('title')}
        </h2>
        <p className="text-xl text-[#8A8FA0] max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 flex gap-4 hover:bg-white/[0.03] transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#628DFF]/10 flex items-center justify-center text-[#628DFF]">
              <Mail size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs text-[#8A8FA0] tracking-wider mb-1">{t('labels.email')}</div>
              <div className="text-[#E8E9EC]">
                <a href="mailto:hello@maxontorres.com" className="hover:text-[#628DFF] transition-colors">
                  hello@MaxonTorres.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 flex gap-4 hover:bg-white/[0.03] transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#628DFF]/10 flex items-center justify-center text-[#628DFF]">
              <MapPin size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs text-[#8A8FA0] tracking-wider mb-1">{t('labels.location')}</div>
              <div className="text-[#E8E9EC]">
                {t('location.city')}
                <div className="text-sm text-[#8A8FA0] mt-1">{t('location.timezone')}</div>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 flex gap-4 hover:bg-white/[0.03] transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#628DFF]/10 flex items-center justify-center text-[#628DFF]">
              <Link2 size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs text-[#8A8FA0] tracking-wider mb-1">{t('labels.connect')}</div>
              <div className="text-[#E8E9EC] flex gap-2">
                <a href="https://github.com/maxonreid" target="_blank" rel="noopener" className="hover:text-[#628DFF] transition-colors">
                  GitHub
                </a>
                <span className="text-[#8A8FA0]">·</span>
                <a href="https://www.linkedin.com/in/maxontorres/" target="_blank" rel="noopener" className="hover:text-[#628DFF] transition-colors">
                  {t('links.linkedin')}
                </a>
                <span className="text-[#8A8FA0]">·</span>
                <a href="https://www.facebook.com/maxontorresweb" target="_blank" rel="noopener" className="hover:text-[#628DFF] transition-colors">
                  Facebook
                </a>
                <span className="text-[#8A8FA0]">·</span>
                <a href="https://www.instagram.com/maxontorresweb/" target="_blank" rel="noopener" className="hover:text-[#628DFF] transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 flex gap-4 hover:bg-white/[0.03] transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#628DFF]/10 flex items-center justify-center text-[#628DFF]">
              <Phone size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs text-[#8A8FA0] tracking-wider mb-1">{t('labels.phoneWhatsapp')}</div>
              <div className="text-[#E8E9EC]">
                <a href="tel:+8562052373435" className="hover:text-[#628DFF] transition-colors">
                  +856 20 52 373 435
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 flex flex-col justify-between gap-8">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">{t('card.title')}</h3>
            <p className="text-[#8A8FA0]">
              {t('card.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://wa.me/8562052373435"
              target="_blank"
              rel="noopener"
              className="w-full py-3 px-6 rounded-lg font-display uppercase transition-all bg-[#628DFF] hover:bg-[#675DFF] text-[#050608] flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
              {t('cta.whatsapp')}
            </a>

            <a
              href="tel:+8562052373435"
              className="w-full py-3 px-6 rounded-lg font-display uppercase transition-all bg-white/[0.06] hover:bg-white/[0.1] text-[#E8E9EC] border border-white/[0.12] flex items-center justify-center gap-2"
            >
              <Phone size={18} strokeWidth={2} aria-hidden="true" />
              {t('cta.callNow')}
            </a>
          </div>

          <div className="font-mono text-xs text-[#8A8FA0]">
            {t('card.numberLabel')} <span className="text-[#628DFF]">+856 20 52 373 435</span>
          </div>
        </div>

      </div>
    </section>
  );
}
