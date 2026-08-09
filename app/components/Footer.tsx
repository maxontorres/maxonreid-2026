'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-[#080808] border-t border-white/[0.03] py-16 px-0" role="contentinfo" aria-label="Footer">
      <div className="w-[92%] max-w-[1200px] mx-auto grid gap-12 grid-cols-1 md:grid-cols-3">
        <div className="space-y-3">
          <div className="font-mono tracking-[8px] font-semibold text-sm text-[#F0EDE6]">MAXON TORRES</div>
          <div className="text-sm text-[#AEACA6]">
            {t('tagline')}
          </div>
        </div>

        <div className="space-y-4">
          <nav className="flex gap-6" aria-label="Footer navigation">
            <a href="#services" className="text-sm text-[#AEACA6] hover:text-[#D4A843] transition-colors">{tNav('services')}</a>
            <a href="#contact" className="text-sm text-[#AEACA6] hover:text-[#D4A843] transition-colors">{tNav('contact')}</a>
          </nav>

          <div className="font-mono text-xs text-[#AEACA6] flex gap-3">
            <span className="text-[#D4A843]">
              {t('connect')}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <a href="mailto:hello@maxontorres.com" className="text-sm text-[#F0EDE6] hover:text-[#D4A843] transition-colors">hello@MaxonTorres.com</a>
            <a href="https://github.com/maxonreid" className="text-sm text-[#AEACA6] hover:text-[#D4A843] transition-colors">
              GitHub
            </a>
          </div>
          <div className="text-xs text-[#AEACA6]">{t('copyright', { year: new Date().getFullYear() })}</div>
        </div>
      </div>
    </footer>
  );
}
