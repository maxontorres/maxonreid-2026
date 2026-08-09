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
          'Software Developer & Consultant in Vientiane, Laos building and managing software for businesses.',
        inLanguage: locale,
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Maximiliano Brito Torres',
        alternateName: 'Maxon Torres',
        url: SITE_URL,
        image: `${SITE_URL}/profile.jpg`,
        jobTitle: 'Software Developer & Consultant',
        description: 'Software Developer & Consultant in Vientiane, Laos, building and managing software for businesses',
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
          'https://github.com/maxontorres',
        ],
        knowsAbout: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Laravel', '.NET', 'Django', 'AWS', 'Software Development', 'Project Management'],
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Software Developer & Consultant',
          occupationLocation: {
            '@type': 'City',
            name: 'Vientiane',
          },
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'Software Development & Consulting',
        description: 'Software development and consulting in Vientiane, Laos — building websites and web apps, managing software projects, and keeping existing systems maintained and running.',
        provider: {
          '@id': `${SITE_URL}/#person`,
        },
        areaServed: {
          '@type': 'City',
          name: 'Vientiane',
          '@id': 'https://www.wikidata.org/wiki/Q9326',
        },
        serviceType: ['Software Development', 'Software Maintenance', 'Project Management', 'Web Development', 'Automation'],
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