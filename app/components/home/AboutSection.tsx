'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { useInView } from '@/app/hooks/useInView';

export default function AboutSection() {
  const t = useTranslations('aboutHome');
  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.35, once: false });

  return (
    <section className="py-24 px-0" id="about">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="font-mono text-sm text-[#8A8FA0] tracking-[8px] font-semibold mb-8">{t('label')}</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight font-display uppercase">{t('title')}</h2>
            <p className="text-xl text-[#E8E9EC] leading-relaxed">{t('intro')}</p>
            <p className="text-lg text-[#8A8FA0] leading-relaxed">{t('description')}</p>

            <Link href="/about" className="inline-block py-3 px-6 rounded-lg bg-transparent border border-white/[0.06] text-[#628DFF] font-display uppercase hover:bg-[#628DFF]/10 hover:border-[#628DFF] transition-all mt-2">
              {t('learnMore')}
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              ref={imageRef as React.RefObject<HTMLDivElement>}
              className="relative overflow-visible"
            >
              <Image
                src="/profile.jpg"
                alt={t('imageAlt')}
                width={500}
                height={600}
                priority
                className={`w-full max-w-md rounded-2xl shadow-2xl transition-transform duration-700 ease-out motion-reduce:transition-none ${
                  imageInView ? 'scale-110' : 'scale-100'
                }`}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
