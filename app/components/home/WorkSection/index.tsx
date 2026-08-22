'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';
import SectionContainer from '@/app/components/shared/SectionContainer';
import { projects as projectsData } from '@/app/lib/projects';

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const t = useTranslations('work');

  const projects = projectsData.map((project) => ({
    ...project,
    desc: t(`projects.${project.slug}.desc`),
  }));

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
              className={`px-4 py-2 rounded-lg border font-display uppercase text-sm transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#628DFF]/10 border-[#628DFF] text-gold'
                  : 'bg-transparent border-white/[0.06] text-text-secondary hover:border-[#628DFF]/50 hover:text-text-primary'
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
            style={{ '--i': index } as React.CSSProperties}
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
