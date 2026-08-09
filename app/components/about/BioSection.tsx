import { useTranslations } from 'next-intl';

export default function BioSection() {
  const t = useTranslations('about.bio');
  
  return (
    <section className="py-24 px-0">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h2>
          <div className="space-y-6 text-lg text-[#AEACA6] leading-relaxed">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
