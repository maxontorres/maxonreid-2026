import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import HeroSection from '@/app/components/home/HeroSection';
import WorkSection from '@/app/components/home/WorkSection';
import AboutSection from '@/app/components/home/AboutSection';
import SocialProofSection from '@/app/components/home/SocialProofSection';
import BlogSection from '@/app/components/home/BlogSection';
import ServicesSection from '@/app/components/home/ServicesSection';
import ReferralSection from '@/app/components/home/ReferralSection';
import ContactSection from '@/app/components/home/ContactSection';
import ReferralModal from '@/app/components/home/ReferralModal';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        lo: '/lo',
        es: '/es',
        'x-default': '/en',
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Maxon Torres',
        description:
          'Fractional CTO and Technical Advisor in Vientiane, Laos specializing in technical strategy, architecture, and full-stack delivery.',
        inLanguage: locale,
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Maximiliano Brito Torres',
        alternateName: 'Maxon Torres',
        url: SITE_URL,
        image: `${SITE_URL}/profile.jpg`,
        jobTitle: 'Fractional CTO / Technical Advisor',
        description: 'Fractional CTO and Technical Advisor in Vientiane, Laos helping startups and SMBs with technical strategy and full-stack delivery',
        workLocation: {
          '@type': 'Place',
          name: 'Vientiane',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Vientiane',
            addressCountry: 'LA',
          },
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vientiane',
          addressCountry: 'LA',
        },
        sameAs: [
          'https://www.linkedin.com/in/maxontorres/',
          'https://github.com/maxonreid',
        ],
        knowsAbout: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Laravel', '.NET', 'Django', 'AWS', 'Technical Strategy', 'Software Architecture'],
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Fractional CTO / Technical Advisor',
          occupationLocation: {
            '@type': 'City',
            name: 'Vientiane',
          },
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'Fractional CTO & Technical Advisory Services',
        description: 'Fractional CTO and technical advisory services in Vientiane, Laos — technical strategy, architecture, vendor and dev-team oversight, and full-stack development.',
        provider: {
          '@id': `${SITE_URL}/#person`,
        },
        areaServed: {
          '@type': 'City',
          name: 'Vientiane',
          '@id': 'https://www.wikidata.org/wiki/Q9326',
        },
        serviceType: ['Technical Advisory', 'Fractional CTO Services', 'Software Architecture', 'Full Stack Development', 'Technical Due Diligence'],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <SocialProofSection />
        <BlogSection />
        <ServicesSection />
        <ReferralSection />
        <ContactSection />
      </main>
      <Footer />
      <ReferralModal />
    </>
  );
}