'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import BlogCard from './BlogCard';
import SectionContainer from '@/app/components/shared/SectionContainer';
import { articles as allArticles } from '@/app/lib/articles';

const articles = allArticles.slice(0, 3);

export default function BlogSection() {
  const locale = useLocale();
  const t = useTranslations('blog');

  return (
    <SectionContainer id="blog" ariaLabelledBy="blog-heading">
      <div className="mb-12 text-center">
        <div className="font-mono text-sm text-text-secondary tracking-[8px] font-semibold mb-4">
          {t('sectionLabel')} — {t('articleCount', { count: articles.length })}
        </div>
        <h2 id="blog-heading" className="text-4xl md:text-5xl font-bold mb-4 font-display uppercase">
          {t('title')}
        </h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <BlogCard
            key={article.id}
            article={article}
            style={{ '--i': index } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          href={`/${locale}/articles`}
          className="inline-flex items-center gap-2 py-3 px-6 rounded-lg bg-transparent border border-white/[0.06] text-text-primary font-mono hover:border-[#628DFF] hover:text-gold transition-all"
          aria-label="View all articles"
        >
          <span>{t('viewAll')}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8 1L15 8L8 15M15 8H1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </SectionContainer>
  );
}
