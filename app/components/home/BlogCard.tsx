'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import type { Article } from '@/app/lib/articles';

interface BlogCardProps {
  article: Article;
}

export default function BlogCard({ article }: BlogCardProps) {
  const locale = useLocale();
  const t = useTranslations('blog');
  const tMeta = useTranslations('articlesMeta');

  const slug = article.slug as 'teaching-web-development-china-yango-university' | 'how-i-built-orderbridge';
  const title = tMeta(`${slug}.title`);
  const excerpt = tMeta(`${slug}.excerpt`);
  
  return (
    <Link href={`/${locale}/articles/${article.slug}`} className="block group">
      <article className="relative bg-white/[0.02] card-hover rounded-xl overflow-hidden" tabIndex={0}>
      <div className="relative aspect-video overflow-hidden">
        <Image
          fill
          src={article.image}
          alt={title}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
      </div>
      <div className="p-6">
        <div className="font-mono text-xs text-text-secondary mb-3 flex items-center gap-2">
          <span>{article.date}</span>
          <span>·</span>
          <span>{t('readTime', { time: article.readTime })}</span>
        </div>
        
        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-gold transition-colors">
          {title}
        </h3>

        <p
          className="text-text-secondary leading-relaxed mb-4"
          id={`blog-excerpt-${article.id}`}
        >
          {excerpt}
        </p>
        
        <div className="flex items-end justify-between gap-4 pt-2 border-t border-white/[0.06]">
          <div className="font-mono text-xs flex flex-wrap gap-2 min-w-0">
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-white/[0.04] border border-white/[0.08] text-[#b6b9c3] px-2.5 py-1 rounded-full whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="shrink-0">
            <span className="font-mono text-sm text-gold inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
              {t('readMore')}
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[#628DFF]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" aria-hidden="true"></div>
    </article>
    </Link>
  );
}
