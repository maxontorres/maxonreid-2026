import { useTranslations } from 'next-intl';
import { Link } from '../../../routing';

export default function CTASection() {
  const t = useTranslations('about.cta');
  
  return (
    <section className="py-24 px-0">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="bg-gradient-to-br from-[#D4A843]/10 to-transparent border border-[#D4A843]/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-xl text-[#AEACA6] mb-8 max-w-2xl mx-auto">{t('subtitle')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="inline-block py-3 px-6 rounded-lg bg-[#D4A843] text-[#080808] font-semibold hover:bg-[#B8902F] transition-colors">
              {t('contact')}
            </Link>
            <Link href="/services" className="inline-block py-3 px-6 rounded-lg bg-transparent border border-white/[0.06] text-[#F0EDE6] font-semibold hover:border-[#D4A843] hover:text-[#D4A843] transition-all">
              {t('services')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
