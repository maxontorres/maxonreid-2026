'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

export default function AboutSection() {
  const t = useTranslations('aboutHome');

  return (
    <section className="py-24 px-0" id="about">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="font-mono text-sm text-[#AEACA6] tracking-[8px] font-semibold mb-8">{t('label')}</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">{t('title')}</h2>
            <p className="text-xl text-[#F0EDE6] leading-relaxed">{t('intro')}</p>
            <p className="text-lg text-[#AEACA6] leading-relaxed">{t('description')}</p>
            
            <div className="grid grid-cols-3 gap-6 py-8">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#D4A843] mb-2">{t('stats.experience')}</div>
                <div className="text-sm text-[#AEACA6]">{t('stats.experienceLabel')}</div>
              </div>
              {/* <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#D4A843] mb-2">{t('stats.projects')}</div>
                <div className="text-sm text-[#AEACA6]">{t('stats.projectsLabel')}</div>
              </div> */}
              {/* <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#D4A843] mb-2">{t('stats.technologies')}</div>
                <div className="text-sm text-[#AEACA6]">{t('stats.technologiesLabel')}</div>
              </div> */}
            </div>
            
            <Link href="/about" className="inline-block py-3 px-6 rounded-lg bg-transparent border border-white/[0.06] text-[#D4A843] font-mono hover:bg-[#D4A843]/10 hover:border-[#D4A843] transition-all">
              {t('learnMore')}
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/profile.jpg"
                alt={t('imageAlt')}
                width={500}
                height={600}
                priority
                className="w-full max-w-md rounded-2xl shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
