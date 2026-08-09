import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/routing';
import { FileText, ArrowRight } from 'lucide-react';
import HeroSection from '@/app/components/about/HeroSection';
import BioSection from '@/app/components/about/BioSection';
import SkillsSection from '@/app/components/about/SkillsSection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const path = `/${locale}/about`;

  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
    alternates: {
      canonical: path,
      languages: {
        en: '/en/about',
        lo: '/lo/about',
        es: '/es/about',
      },
    },
    openGraph: {
      title: t('heroTitle'),
      description: t('heroSubtitle'),
      url: `${SITE_URL}${path}`,
      siteName: 'Maxon Torres',
      type: 'profile',
      images: [
        {
          url: '/about-pic.jpg',
          width: 1200,
          height: 630,
          alt: 'Maximiliano Brito Torres — Full Stack Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('heroTitle'),
      description: t('heroSubtitle'),
      images: ['/about-pic.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('about.cv');

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Maximiliano Brito Torres',
      url: `${SITE_URL}/${locale}/about`,
      description:
        'Full-Stack Developer based in Vientiane, Laos, specializing in Next.js, React, and Node.js.',
      sameAs: [
        'https://www.linkedin.com/in/maxontorres/',
        'https://github.com/maxonreid',
      ],
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />
      <main>
        <HeroSection />

        <BioSection />

        <SkillsSection />

        <section className="w-[92%] max-w-[1200px] mx-auto py-16">
          <div className="relative overflow-hidden rounded-2xl border-2 border-[#D4A843] bg-gradient-to-br from-[#D4A843]/10 via-transparent to-[#D4A843]/5 p-12 text-center backdrop-blur-sm">
            
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A843]/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4A843]/10 rounded-full blur-3xl -z-10"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                {t('experienceTitle')}
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                {t('experienceSubtitle')}
              </p>
              
              <Link 
                href="/cv" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4A843] text-[#080808] font-bold text-lg rounded-xl hover:bg-[#c9a961] hover:shadow-[0_8px_30px_rgba(212,168,67,0.4)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus:outline-2 focus:outline-[#D4A843] focus:outline-offset-4 shadow-lg"
                aria-label="View my full curriculum vitae"
              >
                <FileText size={24} strokeWidth={2.5} aria-hidden="true" />
                {t('viewCV')}
                <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
