import type { Metadata } from 'next';

import InOnOutCaseStudyClient from './InOnOutCaseStudyClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/projects/inonout`;

  return {
    title: 'InOnOut Case Study | Full-Stack E-Learning Marketplace for Laos',
    description:
      'InOnOut is a production e-learning marketplace with student/teacher/admin roles, Mux-powered video courses, and a manual proof-of-payment flow designed for the Lao market.',
    keywords: [
      'InOnOut case study',
      'e-learning platform Laos',
      'Next.js Supabase marketplace',
      'Mux video platform',
      'Sanity CMS',
      'multi-role SaaS',
    ],
    alternates: {
      canonical: path,
      languages: {
        en: '/en/projects/inonout',
        es: '/es/projects/inonout',
        lo: '/lo/projects/inonout',
      },
    },
    openGraph: {
      title: 'InOnOut Case Study: Full-Stack E-Learning Marketplace for Laos',
      description:
        'See how InOnOut serves students, teachers, and admins with video courses via Mux and a manual proof-of-payment flow built around how commerce actually works in Laos.',
      url: path,
      type: 'article',
      images: [
        {
          url: '/images/projects/inonout/inonout-cover.png',
          width: 1917,
          height: 1021,
          alt: 'InOnOut homepage and course catalog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'InOnOut Case Study: Full-Stack E-Learning Marketplace for Laos',
      description:
        'Architecture, stack, and outcomes of a full-stack e-learning marketplace built for the Lao market.',
      images: ['/images/projects/inonout/inonout-cover.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function InOnOutPage({ params }: PageProps) {
  const { locale } = await params;
  const pageUrl = `${SITE_URL}/${locale}/projects/inonout`;

  const caseStudyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'InOnOut: Full-Stack E-Learning Marketplace for Laos',
    description:
      'A technical case study on building InOnOut, a production e-learning marketplace with student/teacher/admin roles, Mux-powered video courses, and a manual proof-of-payment flow for the Lao market.',
    author: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
    },
    inLanguage: locale,
    mainEntityOfPage: pageUrl,
    datePublished: '2026-07-28',
    dateModified: '2026-08-10',
    image: `${SITE_URL}/images/projects/inonout/inonout-cover.png`,
    about: [
      'E-learning platforms',
      'Multi-role SaaS',
      'Video course delivery',
      'Localized payment workflows',
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work',
        item: `${SITE_URL}/${locale}#work`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'InOnOut',
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <InOnOutCaseStudyClient />
    </>
  );
}
