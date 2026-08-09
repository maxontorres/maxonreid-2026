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

export default async function VientianWebsiteArticle({
  locale,
  article,
}: {
  locale: string;
  article: (typeof articles)[0];
}) {
  const t = await getTranslations('vientianeWebsiteArticle');
  const tBlog = await getTranslations('blog');

  const articleUrl = new URL(`/${locale}/articles/${article.slug}`, SITE_URL).toString();
  const articleImage = new URL(article.image, SITE_URL).toString();
  const publishedTime = toISODate(article.date);

  const storefront = t.raw('storefront.benefits') as { title: string; desc: string }[];

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
      jobTitle: 'Full-Stack Developer & Web Consultant',
      sameAs: [
        'https://github.com/maxonreid',
        'https://linkedin.com/in/maxonreid',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
    },
    keywords: article.tags.join(', '),
    articleSection: 'Business & Web',
    inLanguage: locale === 'lo' ? 'lo-LA' : locale === 'es' ? 'es-MX' : 'en-US',
    wordCount: 950,
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
              src="/images/articles/why-businesses-in-vientiane-need-a-website/pmlaos-on-google-results.png"
              alt="PM Laos real estate business appearing on Google search results — example of a Vientiane business with a proper website"
              width={1200}
              height={630}
              priority
              className="w-full max-h-[520px] object-contain"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figHero')}
            </figcaption>
            <meta itemProp="description" content="PM Laos appearing on Google search results" />
            <meta itemProp="name" content="PM Laos on Google" />
          </figure>
        </section>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="w-[92%] max-w-[860px] mx-auto pb-24 space-y-20">

          {/* Section: Google First, Facebook Later */}
          <section>
            <SectionLabel>{t('google.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6" itemProp="alternativeHeadline">
              {t('google.heading')}
            </h2>
            <div className="prose-article">
              <p>{t('google.p1')}</p>
              <p>{t('google.p2')}</p>
              <p>{t('google.p3')}</p>
              <p>{t('google.p4')}</p>
            </div>
          </section>

          {/* Section: Too Many Facebook Pages */}
          <section>
            <SectionLabel>{t('identity.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('identity.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('identity.p1')}</p>
              <p>{t('identity.p2')}</p>
            </div>

            <div className="space-y-2 mb-8">
              {(t.raw('identity.problems') as string[]).map((item) => (
                <div key={item} className="flex gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <span className="text-gold mt-0.5 shrink-0 font-mono text-sm">→</span>
                  <span className="text-sm text-text-primary">{item}</span>
                </div>
              ))}
            </div>

            <div className="prose-article">
              <p>{t('identity.p3')}</p>
              <p>{t('identity.p4')}</p>
            </div>
          </section>

          {/* Image: Facebook copycats */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/articles/why-businesses-in-vientiane-need-a-website/facebook-pmlaos-copycats.png"
              alt="Multiple copycat Facebook pages for the same business causing confusion for customers searching in Vientiane"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full"
              style={{ maxHeight: '520px', objectFit: 'contain' }}
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figCopycats')}
            </figcaption>
            <meta itemProp="description" content="Facebook copycat pages causing confusion" />
          </figure>

          {/* Section: You Don't Own Facebook */}
          <section>
            <SectionLabel>{t('ownership.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('ownership.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('ownership.p1')}</p>
              <p>{t('ownership.p2')}</p>
            </div>

            <div className="space-y-2 mb-8">
              {(t.raw('ownership.risks') as string[]).map((item) => (
                <div key={item} className="flex gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <span className="text-gold mt-0.5 shrink-0 font-mono text-sm">→</span>
                  <span className="text-sm text-text-primary">{item}</span>
                </div>
              ))}
            </div>

            <div className="prose-article">
              <p>{t('ownership.p3')}</p>
              <p>{t('ownership.p4')}</p>
            </div>
          </section>

          {/* Image: PMlaos URL */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/articles/why-businesses-in-vientiane-need-a-website/pmlaos-url.jpeg"
              alt="PMLaos.com — a unique domain name that builds trust and instant brand recognition for a Vientiane business"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full"
              style={{ maxHeight: '520px', objectFit: 'contain' }}
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figUrl')}
            </figcaption>
            <meta itemProp="description" content="PMLaos.com unique domain" />
          </figure>

          {/* Section: Stop Making Customers Work */}
          <section>
            <SectionLabel>{t('friction.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('friction.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('friction.p1')}</p>
              <p>{t('friction.p2')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {(t.raw('friction.painPoints') as string[]).map((item) => (
                <div key={item} className="flex gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <span className="text-gold mt-0.5 shrink-0 font-mono text-sm">→</span>
                  <span className="text-sm text-text-primary">{item}</span>
                </div>
              ))}
            </div>

            <div className="prose-article">
              <p>{t('friction.p3')}</p>
            </div>
          </section>

          {/* Image: PMlaos full listing page */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/projects/pmlaos/www.pmlaos.com_individual_listing_full_page.png"
              alt="PM Laos individual property listing page — all information organized clearly for customers to find instantly"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full"
              style={{ maxHeight: '520px', objectFit: 'contain' }}
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figListing')}
            </figcaption>
            <meta itemProp="description" content="PM Laos organized property listing page" />
          </figure>

          {/* Section: Your Business Looks More Professional */}
          <section>
            <SectionLabel>{t('professionalism.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('professionalism.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('professionalism.p1')}</p>
              <p>{t('professionalism.p2')}</p>
            </div>

            <ArticleCallout label={t('professionalism.calloutLabel')}>
              {t('professionalism.calloutText')}
            </ArticleCallout>
          </section>

          {/* Image: PMlaos homepage */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/projects/pmlaos/pmlaos.com_homepage.png"
              alt="PM Laos real estate website homepage — a professional, modern website for a Vientiane business"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full"
              style={{ maxHeight: '520px', objectFit: 'contain' }}
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figHomepage')}
            </figcaption>
            <meta itemProp="description" content="PM Laos homepage" />
          </figure>

          {/* Section: Your Website Is Your Digital Storefront */}
          <section>
            <SectionLabel>{t('storefront.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('storefront.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('storefront.p1')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {storefront.map((benefit) => (
                <div key={benefit.title} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-gold/30 transition-colors">
                  <h3 className="text-sm font-bold text-text-primary mb-1">{benefit.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Image grid: Lao Mai Travel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
              <Image
                src="/images/projects/laomaitravel/hero-section.png"
                alt="Lao Mai Travel website hero section — a professional tourism website for a Vientiane-based business"
                width={600}
                height={400}
                loading="lazy"
                className="w-full object-cover h-64 md:h-80"
                itemProp="url contentUrl"
              />
              <meta itemProp="description" content="Lao Mai Travel website hero" />
            </figure>
            <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
              <Image
                src="/images/projects/laomaitravel/tourpackages.png"
                alt="Lao Mai Travel tour packages page — organized service listings that make it easy for customers to find and book"
                width={600}
                height={400}
                loading="lazy"
                className="w-full object-cover h-64 md:h-80"
                itemProp="url contentUrl"
              />
              <meta itemProp="description" content="Lao Mai Travel tour packages" />
            </figure>
          </div>

          {/* Section: Real Experience + The Reality */}
          <section>
            <SectionLabel>{t('reality.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('reality.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('reality.p1')}</p>
              <p>{t('reality.p2')}</p>
              <p>{t('reality.p3')}</p>
              <p>{t('reality.p4')}</p>
            </div>

            <ArticleCallout label={t('reality.calloutLabel')}>
              {t('reality.calloutText')}
            </ArticleCallout>

            <div className="prose-article mt-8">
              <p>{t('reality.p5')}</p>
            </div>
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
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold text-bg-dark px-6 py-3 rounded-lg font-display uppercase hover:bg-gold-strong transition-colors"
              >
                {t('cta.contact')}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 border border-white/[0.06] text-text-secondary px-6 py-3 rounded-lg font-display uppercase text-sm hover:border-gold/50 hover:text-text-primary transition-all"
              >
                {t('cta.viewAll')}
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
