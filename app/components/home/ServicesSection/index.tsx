'use client';

import { useTranslations } from 'next-intl';
import ServiceCard from './ServiceCard';
import SectionContainer from '@/app/components/shared/SectionContainer';
import { Globe, Monitor, Zap, ShieldCheck } from 'lucide-react';

export default function ServicesSection() {
  const t = useTranslations('services');
  const deliverLabel = t('deliverLabel');
  const toolsLabel = t('toolsLabel');
  const subtitleSecondary = t('subtitleSecondary');

  const services = [
    {
      id: 1,
      icon: <Globe size={24} />,
      title: t('items.websiteDev.title'),
      valueStatement: t('items.websiteDev.valueStatement'),
      desc: t('items.websiteDev.desc'),
      details: [
        t('items.websiteDev.details.0'),
        t('items.websiteDev.details.1'),
        t('items.websiteDev.details.2'),
        t('items.websiteDev.details.3'),
        t('items.websiteDev.details.4'),
        t('items.websiteDev.details.5'),
      ],
      tools: t('items.websiteDev.tools'),
      projectLink: '/websites',
    },
    {
      id: 2,
      icon: <Monitor size={24} />,
      title: t('items.webApps.title'),
      valueStatement: t('items.webApps.valueStatement'),
      desc: t('items.webApps.desc'),
      details: [
        t('items.webApps.details.0'),
        t('items.webApps.details.1'),
        t('items.webApps.details.2'),
        t('items.webApps.details.3'),
        t('items.webApps.details.4'),
      ],
      tools: t('items.webApps.tools'),
      projectLink: '#projects',
    },
    {
      id: 3,
      icon: <Zap size={24} />,
      title: t('items.automation.title'),
      valueStatement: t('items.automation.valueStatement'),
      desc: t('items.automation.desc'),
      details: [
        t('items.automation.details.0'),
        t('items.automation.details.1'),
        t('items.automation.details.2'),
        t('items.automation.details.3'),
        t('items.automation.details.4'),
      ],
      tools: t('items.automation.tools'),
      projectLink: '#projects',
    },
    {
      id: 4,
      icon: <ShieldCheck size={24} />,
      title: t('items.maintenance.title'),
      valueStatement: t('items.maintenance.valueStatement'),
      desc: t('items.maintenance.desc'),
      details: [
        t('items.maintenance.details.0'),
        t('items.maintenance.details.1'),
        t('items.maintenance.details.2'),
        t('items.maintenance.details.3'),
        t('items.maintenance.details.4'),
      ],
      tools: t('items.maintenance.tools'),
      projectLink: '#contact',
    },
  ];

  return (
    <SectionContainer id="services" ariaLabelledBy="services-heading">
      <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-center mb-4 font-display uppercase">
        {t('title')}
      </h2>
      <p className="text-xl text-text-secondary text-center max-w-2xl mx-auto mb-12">
        {t('subtitle')}
      </p>
      {subtitleSecondary && (
        <p className="text-xl text-text-secondary text-center max-w-2xl mx-auto mb-12 -mt-8">
          {subtitleSecondary}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            deliverLabel={deliverLabel}
            toolsLabel={toolsLabel}
            index={index}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
