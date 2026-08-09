'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

interface Project {
  id: number;
  title: string;
  year: string;
  image: string;
  images: string[];
  desc: string;
  tags: string[];
  category: string;
  caseStudyUrl: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  style?: React.CSSProperties;
}

export default function ProjectCard({ project, style }: ProjectCardProps) {
  const t = useTranslations('work');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const images = project.images.length > 0 ? project.images : [project.image];

  useEffect(() => {
    if (isHovered && !reducedMotion.current && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % images.length);
      }, 1200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isHovered) setCurrentIndex(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, images.length]);

  return (
    <Link href={project.caseStudyUrl} style={style} className="block h-full">
      <article
        className="bg-white/[0.02] card-hover rounded-xl overflow-hidden cursor-pointer group h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden" aria-hidden="true">
          {images.map((src, i) => (
            <Image
              key={src}
              fill
              loading="lazy"
              alt={i === 0 ? `${project.title} screenshot` : ''}
              src={src}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-700 ${
                i === currentIndex ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? '' : 'group-hover:scale-110'} transition-transform duration-500`}
            />
          ))}

          {/* Slide indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    i === currentIndex ? 'bg-gold' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
            <div>
              <div className="text-2xl font-bold text-text-primary mb-1">{project.title}</div>
              <div className="font-mono text-sm text-text-secondary">{project.year}</div>
              <div className="flex gap-2 mt-3 font-mono text-xs">
                {project.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="bg-gold/20 text-gold px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="bg-gold/20 text-gold px-2 py-1 rounded">
                    +{project.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
            <div
              className="bg-gold text-[#050608] px-4 py-2 rounded-lg font-display uppercase flex items-center gap-2 hover:bg-[#675DFF] transition-colors text-sm"
              aria-hidden="true"
            >
              {t('caseStudy')}
            </div>
          </div>

          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
            <span className="font-mono text-sm text-text-secondary">{project.year}</span>
          </div>
          <p className="text-text-secondary mb-4 leading-relaxed text-sm">{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="font-mono text-xs bg-white/[0.03] border border-white/[0.06] text-text-secondary px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </article>
    </Link>
  );
}
