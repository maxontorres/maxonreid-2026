'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTypewriter } from './useTypewriter';
import { useInView } from '@/app/hooks/useInView';

export default function HeroSection() {
  const t = useTranslations('hero');

  const highlightTexts = t.raw('heroHighlights') as string[];
  const typewriterText = useTypewriter(highlightTexts, 80, 3000, 15);
  const { ref: revealRef, inView } = useInView({ threshold: 0.1, once: true });

  return (
    <section className="py-24 px-0 pb-30 relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="w-[92%] max-w-[1200px] mx-auto grid gap-9 grid-cols-1 lg:grid-cols-[1fr_420px] items-center">
        <div
          ref={revealRef as React.RefObject<HTMLDivElement>}
          className={`max-w-[720px] hero-content order-2 lg:order-1 reveal-3d-item ${inView ? 'reveal-3d-visible' : 'reveal-3d-hidden'}`}
        >
          <div className="meta-label mb-2">{t('brand')}</div>
          <div className="meta-label mb-4">
            {t('location')}
          </div>

          {/* The Main Website Headline */}
          <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-[52px] leading-tight my-1.5 font-black tracking-tight font-display">
            <span className="text-white">{t('heroTitlePrefix')}</span>{' '}
            <span className="text-[#E8E9EC] inline-block min-w-0 sm:min-w-[420px] text-glow-neon">
              {typewriterText}
              <span className="inline-block w-[3px] h-[1.1em] bg-[#E8E9EC] ml-[2px] align-middle animate-[blink_1s_step-end_infinite] shadow-[0_0_4px_rgba(255,255,255,0.9),0_0_10px_rgba(183,215,255,0.8),0_0_20px_rgba(98,141,255,0.6)]"></span>
            </span>
          </h1>

          {/* <p className="text-[#8A8FA0] max-w-[560px] mb-4.5">
            {t('heroSub')}
          </p> */}

          <div className="flex gap-3.5 mt-4.5">

            {/* Start a Project */}
            <a className="inline-block py-3 px-5 rounded-[10px] bg-transparent border border-white/[0.06] text-[#628DFF] no-underline font-display uppercase tracking-wide transition-all hover:bg-gradient-to-b hover:from-[#628DFF]/[0.06] hover:to-transparent hover:text-[#E8E9EC] hover:border-[#628DFF]" href="#contact">
              {t('ctaStart')}
            </a>

            {/* View my work */}
            <a className="inline-block py-3 px-5 rounded-[10px] bg-transparent border border-white/[0.06] text-[#E8E9EC] no-underline font-display uppercase tracking-wide transition-all opacity-90 hover:bg-gradient-to-b hover:from-[#628DFF]/[0.06] hover:to-transparent hover:border-[#628DFF]" href="#work">
              {t('ctaView')}
            </a>

          </div>
        </div>

        <div
          className="group flex justify-center items-center order-1 lg:order-2"
          aria-hidden="false"
        >
          <div className="relative w-full max-w-[360px]">
            {/* Ambient electric/violet glow */}
            <div className="glow-orb glow-orb--duo -inset-6 transition-transform duration-500 ease-out group-hover:scale-110" />

            <div className="relative rounded-2xl border border-white/[0.08] bg-[#0D0F16] p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="relative aspect-[637/1079] rounded-xl overflow-hidden">
                <Image
                  src="/maxontorres-suit-jacket.png"
                  alt="Maximiliano Brito Torres"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 360px"
                  className="object-cover duotone-photo transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                {/* Cool blue/violet color-grade tint */}
                <div className="duotone-photo-tint" />
                {/* Bottom-up vignette for cinematic depth, layered above the tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/75 via-transparent to-transparent" />
              </div>

              {/* Corner accents — asymmetric electric/violet duo */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#628DFF] rounded-tl-2xl pointer-events-none transition-colors duration-300 group-hover:border-[#B7D7FF]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#675DFF] rounded-br-2xl pointer-events-none transition-colors duration-300 group-hover:border-[#B7D7FF]" />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
