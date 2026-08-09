'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-[#050608] border-t border-white/[0.03] py-16 px-0" role="contentinfo" aria-label="Footer">
      <div className="w-[92%] max-w-[1200px] mx-auto grid gap-12 grid-cols-1 md:grid-cols-3">
        <div className="space-y-3">
          <div className="meta-label text-[#E8E9EC]">MAXON TORRES</div>
          <div className="text-sm text-[#8A8FA0]">
            {t('tagline')}
          </div>
        </div>

        <div className="space-y-4">
          <nav className="flex gap-6" aria-label="Footer navigation">
            <a href="#services" className="text-sm text-[#8A8FA0] hover:text-[#628DFF] transition-colors">{tNav('services')}</a>
            <a href="#contact" className="text-sm text-[#8A8FA0] hover:text-[#628DFF] transition-colors">{tNav('contact')}</a>
          </nav>

          <div className="font-mono text-xs text-[#8A8FA0] flex gap-3">
            <span className="text-[#628DFF]">
              {t('connect')}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <a href="mailto:hello@maxontorres.com" className="text-sm text-[#E8E9EC] hover:text-[#628DFF] transition-colors">hello@MaxonTorres.com</a>
            <a href="https://github.com/maxonreid" className="text-sm text-[#8A8FA0] hover:text-[#628DFF] transition-colors">
              GitHub
            </a>
          </div>
          <div className="text-xs text-[#8A8FA0]">{t('copyright', { year: new Date().getFullYear() })}</div>
        </div>
      </div>
    </footer>
  );
}
