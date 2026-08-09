'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';
import SectionContainer from '@/app/components/shared/SectionContainer';

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const t = useTranslations('work');

  const projects = [
    {
      id: 1,
      title: 'OrderBridge',
      year: '2026',
      image: '/images/projects/orderbridge/orderbridge-cover.png',
      images: [
        '/images/projects/orderbridge/orderbridge-cover.png',
        '/images/projects/orderbridge/orderbridge-dashboard.png',
        '/images/projects/orderbridge/orderbridge-mock-pos.png',
        '/images/projects/orderbridge/orderbridge-simulator.png',
      ],
      desc: t('projects.orderbridge.desc'),
      tags: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'OAuth 2.0'],
      category: 'automation',
      caseStudyUrl: '/projects/orderbridge',
      liveUrl: 'https://orderbridge.maxontorres.com',
    },
    {
      id: 2,
      title: 'Travel Agency Website',
      year: '2026',
      image: '/images/projects/laomaitravel/hero-section.png',
      images: [
        '/images/projects/laomaitravel/hero-section.png',
        '/images/projects/laomaitravel/destinations.png',
        '/images/projects/laomaitravel/umami-main-dashboard.png',
        '/images/projects/laomaitravel/umami-locations.png',
      ],
      desc: t('projects.laomaitravel.desc'),
      tags: ['Next.js 15', 'TypeScript', 'next-intl', 'Umami', 'Resend'],
      category: 'web',
      caseStudyUrl: '/projects/tourism-website-seo',
      liveUrl: 'https://laomaitravel.com',
    },
    {
      id: 3,
      title: 'PM Real Estate Laos',
      year: '2026',
      image: '/images/projects/pmlaos/pmlaos.com_homepage.png',
      images: [
        '/images/projects/pmlaos/pmlaos.com_homepage.png',
        '/images/projects/pmlaos/Listings_Gallery_Multiple_Properties.png',
        '/images/projects/pmlaos/www.pmlaos.com_individual_listing_full_page.png',
        '/images/projects/pmlaos/www.pmlaos.com_admin_main_dashboard.png',
      ],
      desc: t('projects.pmlaos.desc'),
      tags: ['Next.js 15', 'TypeScript', 'next-intl', 'Prisma', 'Google OAuth'],
      category: 'web',
      caseStudyUrl: '/projects/real-estate-website-laos',
      liveUrl: 'https://www.pmlaos.com/en',
    },
  ];

  const categories = [
    { id: 'all',         label: t('categories.all') },
    { id: 'automation',  label: t('categories.automation') },
    { id: 'web',         label: t('categories.web') },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <SectionContainer id="work" ariaLabelledBy="work-heading">
      <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="font-mono text-sm text-text-secondary tracking-[8px] font-semibold">
          {t('sectionLabel')}
        </div>

        <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeFilter === cat.id}
              aria-controls="projects-grid"
              className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#D4A843]/10 border-[#D4A843] text-gold'
                  : 'bg-transparent border-white/[0.06] text-text-secondary hover:border-[#D4A843]/50 hover:text-text-primary'
              }`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        id="projects-grid"
        role="tabpanel"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">{t('noProjects')}</p>
        </div>
      )}
    </SectionContainer>
  );
}
