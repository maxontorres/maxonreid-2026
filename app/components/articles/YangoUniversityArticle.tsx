import Image from 'next/image';
import { Link } from '@/routing';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getTranslations } from 'next-intl/server';
import { articles } from '@/app/lib/articles';
import { toISODate } from '@/app/lib/articleUtils';
import SectionLabel from './shared/SectionLabel';
import ArticleCallout from './shared/ArticleCallout';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

export default async function YangoUniversityArticle({
  locale,
  article,
}: {
  locale: string;
  article: (typeof articles)[0];
}) {
  const t = await getTranslations('yangoArticle');
  const tBlog = await getTranslations('blog');

  const articleUrl = new URL(`/${locale}/articles/${article.slug}`, SITE_URL).toString();
  const articleImage = new URL(article.image, SITE_URL).toString();
  const publishedTime = toISODate(article.date);

  const topics = t.raw('curriculum.topics') as string[];
  const concepts = t.raw('insight.concepts') as string[];
  const benefits = t.raw('insight.benefits') as { title: string; desc: string }[];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [articleImage],
    datePublished: publishedTime,
    dateModified: publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    author: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
      jobTitle: 'Full-Stack Developer & Educator',
      sameAs: [
        'https://github.com/maxontorres',
        'https://linkedin.com/in/maxontorres',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
    },
    keywords: article.tags.join(', '),
    articleSection: 'Career & Education',
    inLanguage: locale === 'lo' ? 'lo-LA' : locale === 'es' ? 'es-MX' : 'en-US',
    wordCount: 900,
    timeRequired: 'PT5M',
    isAccessibleForFree: true,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('breadcrumbHome'), item: new URL(`/${locale}`, SITE_URL).toString() },
      { '@type': 'ListItem', position: 2, name: t('breadcrumbArticles'), item: new URL(`/${locale}/articles`, SITE_URL).toString() },
      { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <article itemScope itemType="https://schema.org/Article">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-0 w-[92%] max-w-[860px] mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 font-mono text-sm text-text-secondary">
              <li><Link href="/" className="hover:text-gold transition-colors">{t('breadcrumbHome')}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/articles" className="hover:text-gold transition-colors">{t('breadcrumbArticles')}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gold truncate max-w-[200px]" aria-current="page">{t('breadcrumbCurrent')}</li>
            </ol>
          </nav>

          {/* Tags + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {article.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs border border-white/[0.06] text-text-secondary px-3 py-1 rounded-full" itemProp="keywords">
                {tag}
              </span>
            ))}
            <time dateTime={publishedTime} itemProp="datePublished" className="font-mono text-xs text-text-secondary">
              {article.date} · {tBlog('readTime', { time: article.readTime })}
            </time>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6" itemProp="headline">
            {t('titleMain')} <span className="text-gold">{t('titleHighlight')}</span>
          </h1>

          {/* Lede */}
          <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-2xl" itemProp="abstract">
            {t('lede')}
          </p>

          {/* Hero image */}
          <figure className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.5)] mb-20" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/articles/yango-university-china/students-coding.jpeg"
              alt="Students learning web development and coding at Yango University in Fuzhou, China"
              width={1200}
              height={630}
              priority
              className="w-full object-cover"
              itemProp="url contentUrl"
            />
            <meta itemProp="description" content="Students coding at Yango University" />
            <meta itemProp="name" content="Yango University Web Development Class" />
          </figure>
        </section>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="w-[92%] max-w-[860px] mx-auto pb-24 space-y-20">

          {/* Section: Teaching the Foundations */}
          <section>
            <SectionLabel>{t('curriculum.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6" itemProp="alternativeHeadline">
              {t('curriculum.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('curriculum.p1')}</p>
              <p>{t('curriculum.p2')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {topics.map((topic) => (
                <div key={topic} className="flex gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <span className="text-gold mt-0.5 shrink-0 font-mono text-sm">→</span>
                  <span className="text-sm text-text-primary">{topic}</span>
                </div>
              ))}
            </div>

            <div className="prose-article">
              <p>{t('curriculum.p3')}</p>
              <p>{t('curriculum.p4')}</p>
            </div>
          </section>

          {/* Image: Student presenting */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/articles/yango-university-china/student-presenting-a-topic.jpeg"
              alt="Student presenting web development project and topic at Yango University class"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full object-cover"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figStudentPresenting')}
            </figcaption>
            <meta itemProp="description" content="Student presenting at Yango University" />
          </figure>

          {/* Section: Teaching in a Different Culture */}
          <section>
            <SectionLabel>{t('challenge.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('challenge.heading')}
            </h2>
            <div className="prose-article">
              <p>{t('challenge.p1')}</p>
              <p>{t('challenge.p2')}</p>
              <p>{t('challenge.p3')}</p>
            </div>
          </section>

          {/* Image grid: Students coding */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
              <Image
                src="/images/articles/yango-university-china/female-student-coding.jpeg"
                alt="Female student working on web development HTML CSS JavaScript exercise at Yango University"
                width={600}
                height={400}
                loading="lazy"
                className="w-full object-cover h-64 md:h-80"
                itemProp="url contentUrl"
              />
              <meta itemProp="description" content="Female student coding at Yango University" />
            </figure>
            <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
              <Image
                src="/images/articles/yango-university-china/male-student-coding.jpeg"
                alt="Male student working on web development HTML CSS JavaScript exercise at Yango University"
                width={600}
                height={400}
                loading="lazy"
                className="w-full object-cover h-64 md:h-80"
                itemProp="url contentUrl"
              />
              <meta itemProp="description" content="Male student coding at Yango University" />
            </figure>
          </div>

          {/* Section: Why Teaching Makes You Better */}
          <section>
            <SectionLabel>{t('insight.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('insight.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('insight.p1')}</p>
              <p>{t('insight.p2')}</p>
            </div>

            <div className="space-y-3 mb-8">
              {concepts.map((concept) => (
                <div key={concept} className="flex gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <span className="text-gold mt-0.5 shrink-0 font-mono text-sm">→</span>
                  <span className="text-sm text-text-primary">{concept}</span>
                </div>
              ))}
            </div>

            <div className="prose-article mb-8">
              <p>{t('insight.p3')}</p>
              <p>{t('insight.p4')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-gold/30 transition-colors">
                  <h3 className="text-sm font-bold text-text-primary mb-1">{benefit.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="prose-article mt-8">
              <p>{t('insight.p5')}</p>
            </div>
          </section>

          {/* Image: Group presentation */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/articles/yango-university-china/students-presenting-a-topic.jpeg"
              alt="Students presenting their web development final project at Yango University in Fuzhou China"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full object-cover"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figStudentsPresenting')}
            </figcaption>
            <meta itemProp="description" content="Students presenting at Yango University" />
          </figure>

          {/* Section: A Global Industry */}
          <section>
            <SectionLabel>{t('perspective.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('perspective.heading')}
            </h2>
            <div className="prose-article">
              <p>{t('perspective.p1')}</p>
              <p>{t('perspective.p2')}</p>
              <p>{t('perspective.p3')}</p>
              <p>{t('perspective.p4')}</p>
            </div>
          </section>

          {/* Image: Students working together */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/articles/yango-university-china/female-and-male-student-coding.jpeg"
              alt="Students collaborating on web development project learning HTML CSS JavaScript at Yango University"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full object-cover"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figCollaborative')}
            </figcaption>
            <meta itemProp="description" content="Collaborative coding at Yango University" />
          </figure>

          {/* Section: Looking Back */}
          <section>
            <SectionLabel>{t('reflection.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('reflection.heading')}
            </h2>
            <div className="prose-article">
              <p>{t('reflection.p1')}</p>
              <p>{t('reflection.p2')}</p>
            </div>

            <ArticleCallout label={t('reflection.calloutLabel')}>
              {t('reflection.calloutText')}
            </ArticleCallout>
          </section>

          {/* CTA */}
          <section className="border-t border-white/[0.06] pt-16">
            <div className="font-mono text-sm text-text-secondary tracking-[8px] font-semibold mb-6">
              {t('cta.label')}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              {t('cta.heading')}
            </h2>
            <p className="text-text-secondary mb-10 leading-relaxed max-w-xl">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 bg-gold text-bg-dark px-6 py-3 rounded-lg font-display uppercase hover:bg-gold-strong transition-colors"
              >
                {t('cta.viewAll')}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-white/[0.06] text-text-secondary px-6 py-3 rounded-lg font-display uppercase text-sm hover:border-gold/50 hover:text-text-primary transition-all"
              >
                {t('cta.backHome')}
              </Link>
            </div>
          </section>

        </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
