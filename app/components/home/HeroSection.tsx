'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
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
          <div className="relative w-full max-w-[360px]">
            {/* Ambient gold glow */}
            <div className="absolute -inset-6 bg-[#D4A843]/[0.12] blur-[60px] rounded-full pointer-events-none" />

            <div className="relative rounded-2xl border border-white/[0.08] bg-[#111111] p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="relative aspect-[637/1079] rounded-xl overflow-hidden">
                <Image
                  src="/maxontorres-suit-jacket.png"
                  alt="Maximiliano Brito Torres"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 360px"
                  className="object-cover"
                />
                {/* Subtle bottom-up vignette for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4A843] rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4A843] rounded-br-2xl pointer-events-none" />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
