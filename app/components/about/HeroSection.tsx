import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('about');
  
  return (
    <section className="py-24 px-0 relative bg-gradient-to-b from-[#050608] to-transparent">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="meta-label">{t('heroLabel')}</div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight font-display">{t('heroTitle')}</h1>
            <p className="text-xl text-[#8A8FA0] leading-relaxed">{t('heroSubtitle')}</p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80">
              <div className="glow-orb glow-orb--duo -inset-4 -z-10" />
              <Image
                src="/about-pic.jpg"
                alt="Maxon Torres"
                fill
                priority
                className="object-cover rounded-2xl shadow-2xl relative z-10 duotone-photo"
              />
              <div className="duotone-photo-tint rounded-2xl z-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
