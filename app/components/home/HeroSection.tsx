'use client';

import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl';
import enMessages from '@/messages/en.json';
import TerminalDevice from './TerminalDevice';
import { useTypewriter } from './useTypewriter';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  
  const highlightTexts = t.raw('heroHighlights') as string[];
  const typewriterText = useTypewriter(highlightTexts, 80, 3000, 15);

  return (
    <section className="py-24 px-0 pb-30 relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="w-[92%] max-w-[1200px] mx-auto grid gap-9 grid-cols-1 lg:grid-cols-[1fr_420px] items-center">
        <div className="max-w-[720px] hero-content">
          <div className="font-mono text-sm text-[#AEACA6] tracking-[8px] font-semibold mb-2">{t('brand')}</div>
          <div className="font-mono text-[13px] text-[#AEACA6] tracking-[2px] mb-4">
            {t('location')}
          </div>

          {/* The Main Website Headline */}
          <h1 id="hero-heading" className="text-[52px] leading-tight my-1.5 font-black tracking-tight font-display">
            {t('heroTitlePrefix')}{' '}
            <span className="text-[#D4A843] inline-block min-w-[420px]">
              {typewriterText}
              <span className="inline-block w-[3px] h-[1.1em] bg-[#D4A843] ml-[2px] align-middle animate-[blink_1s_step-end_infinite]"></span>
            </span>
          </h1>

          <p className="text-[#AEACA6] max-w-[560px] mb-4.5">
            {t('heroSub')}
          </p>

          <div className="flex gap-3.5 mt-4.5">

            {/* Start a Project */}
            <a className="inline-block py-3 px-5 rounded-[10px] bg-transparent border border-white/[0.06] text-[#D4A843] no-underline font-mono tracking-wide transition-all hover:bg-gradient-to-b hover:from-[#D4A843]/[0.06] hover:to-transparent hover:text-[#F0EDE6] hover:border-[#D4A843]" href="#contact">
              {t('ctaStart')}
            </a>

            {/* View my work */}
            <a className="inline-block py-3 px-5 rounded-[10px] bg-transparent border border-white/[0.06] text-[#F0EDE6] no-underline font-mono tracking-wide transition-all opacity-90 hover:bg-gradient-to-b hover:from-[#D4A843]/[0.06] hover:to-transparent hover:border-[#D4A843]" href="#work">
              {t('ctaView')}
            </a>

          </div>
        </div>

        <div
          className={`${locale === 'lo' ? 'hidden lg:flex' : 'flex'} justify-center items-center`}
          aria-hidden="false"
        >
          <NextIntlClientProvider locale="en">
            <TerminalDevice />
          </NextIntlClientProvider>
        </div>
        
      </div>
    </section>
  );
}
