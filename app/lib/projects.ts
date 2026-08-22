export interface Project {
  id: number;
  slug: string;
  title: string;
  year: string;
  image: string;
  images: string[];
  tags: string[];
  category: string;
  caseStudyUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'orderbridge',
    title: 'OrderBridge',
    year: '2026',
    image: '/images/projects/orderbridge/orderbridge-cover.png',
    images: [
      '/images/projects/orderbridge/orderbridge-cover.png',
      '/images/projects/orderbridge/orderbridge-dashboard.png',
      '/images/projects/orderbridge/orderbridge-mock-pos.png',
      '/images/projects/orderbridge/orderbridge-simulator.png',
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'OAuth 2.0'],
    category: 'automation',
    caseStudyUrl: '/projects/orderbridge',
    liveUrl: 'https://orderbridge.maxontorres.com',
  },
  {
    id: 2,
    slug: 'laomaitravel',
    title: 'Travel Agency Website',
    year: '2026',
    image: '/images/projects/laomaitravel/hero-section.png',
    images: [
      '/images/projects/laomaitravel/hero-section.png',
      '/images/projects/laomaitravel/destinations.png',
      '/images/projects/laomaitravel/umami-main-dashboard.png',
      '/images/projects/laomaitravel/umami-locations.png',
    ],
    tags: ['Next.js 15', 'TypeScript', 'next-intl', 'Umami', 'Resend'],
    category: 'web',
    caseStudyUrl: '/projects/tourism-website-seo',
    liveUrl: 'https://laomaitravel.com',
  },
  {
    id: 3,
    slug: 'pmlaos',
    title: 'PM Real Estate Laos',
    year: '2026',
    image: '/images/projects/pmlaos/pmlaos.com_homepage.png',
    images: [
      '/images/projects/pmlaos/pmlaos.com_homepage.png',
      '/images/projects/pmlaos/Listings_Gallery_Multiple_Properties.png',
      '/images/projects/pmlaos/www.pmlaos.com_individual_listing_full_page.png',
      '/images/projects/pmlaos/www.pmlaos.com_admin_main_dashboard.png',
    ],
    tags: ['Next.js 15', 'TypeScript', 'next-intl', 'Prisma', 'Google OAuth'],
    category: 'web',
    caseStudyUrl: '/projects/real-estate-website-laos',
    liveUrl: 'https://www.pmlaos.com/en',
  },
  {
    id: 4,
    slug: 'inonout',
    title: 'InOnOut',
    year: '2026',
    image: '/images/projects/inonout/inonout-cover.png',
    images: [
      '/images/projects/inonout/inonout-cover.png',
      '/images/projects/inonout/inonout-courses.png',
      '/images/projects/inonout/inonout-tutor-dashboard.png',
    ],
    tags: ['Next.js 16', 'Supabase', 'TypeScript', 'Mux', 'Sanity'],
    category: 'web',
    caseStudyUrl: '/projects/inonout',
    liveUrl: 'https://inonout.com',
  },
];
