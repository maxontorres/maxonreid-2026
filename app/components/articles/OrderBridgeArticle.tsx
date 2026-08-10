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

const githubIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default async function OrderBridgeArticle({
  locale,
  article,
}: {
  locale: string;
  article: (typeof articles)[0];
}) {
  const t = await getTranslations('orderbridgeArticle');
  const tBlog = await getTranslations('blog');

  const articleUrl = new URL(`/${locale}/articles/${article.slug}`, SITE_URL).toString();
  const articleImage = new URL(article.image, SITE_URL).toString();
  const publishedTime = toISODate(article.date);

  const archNodes = t.raw('brief.archNodes') as string[];
  const weeks = t.raw('brief.weeks') as { week: string; title: string; goal: string; result: string }[];
  const deliverables = t.raw('brief.deliverables') as { name: string; desc: string }[];
  const prerequisites = t.raw('brief.prerequisites') as string[];
  const objectives = t.raw('brief.objectives') as { label: string; desc: string }[];
  const listItems = t.raw('painPoint.listItems') as string[];
  const steps = t.raw('engineering.steps') as { n: string; title: string; desc: string }[];
  const requirements = t.raw('process.requirements') as { label: string; title: string; desc: string }[];
  const techItems = t.raw('techStack.items') as { name: string; body: string }[];
  const services = t.raw('deployment.services') as { host: string; service: string; detail: string; tag: string }[];
  const portfolioRepos = t.raw('portfolio.repos') as { name: string; body: string }[];
  const sourceRepos = t.raw('sourceCode.repos') as { title: string; desc: string; url?: string }[];
  const demos = t.raw('liveDemos.demos') as { name: string; desc: string; url?: string }[];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    image: [articleImage],
    datePublished: publishedTime,
    dateModified: publishedTime,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    author: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
      jobTitle: 'Full-Stack Developer',
      sameAs: ['https://github.com/maxontorres', 'https://linkedin.com/in/maxontorres'],
    },
    publisher: { '@type': 'Person', name: 'Maximiliano Brito Torres', url: SITE_URL },
    keywords: article.tags.join(', '),
    articleSection: 'Software Development',
    inLanguage: locale === 'lo' ? 'lo-LA' : locale === 'es' ? 'es-MX' : 'en-US',
    isAccessibleForFree: true,
    wordCount: 1800,
    timeRequired: 'PT8M',
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

  const sourceReposWithUrls = [
    { ...sourceRepos[0], url: 'https://github.com/maxontorres/orderbridge-api' },
    { ...sourceRepos[1], url: 'https://github.com/maxontorres/orderbridge-dashboard/' },
    { ...sourceRepos[2], url: 'https://github.com/maxontorres/mock-pos-server' },
  ];

  const portfolioReposWithUrls = [
    { ...portfolioRepos[0], github: 'https://github.com/maxontorres/orderbridge-api' },
    { ...portfolioRepos[1], github: 'https://github.com/maxontorres/orderbridge-dashboard/' },
    { ...portfolioRepos[2], github: 'https://github.com/maxontorres/mock-pos-server' },
  ];

  const demosWithUrls = [
    { ...demos[0], url: 'https://orderbridge.maxontorres.com/', icon: '📊' },
    { ...demos[1], url: 'https://mock-pos-server-production.up.railway.app/orders', icon: '🍜' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <article itemScope itemType="https://schema.org/TechArticle">

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
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6 font-display" itemProp="headline">
            {t('titleMain')}{' '}
            <span className="text-gold">{t('titleHighlight')}</span>
          </h1>

          {/* Lede */}
          <p className="text-xl text-text-secondary leading-relaxed mb-12 max-w-2xl" itemProp="abstract">
            {t('lede')}
          </p>

          <div className="prose-article mb-12 max-w-none">
            <p>
              {t('introP1Pre')}{' '}
              <em lang="es">
                &ldquo;Queremos conectar los servicios de domicilios de nuestros clientes (DoorDash, etc.)
                a StreamOrder utilizando OAuth. Una vez que StreamOrder esté conectado y autenticado,
                las cuentas de los servicios de entrega de los clientes se conectarán a nuestro sistema
                POS.&rdquo;
              </em>{' '}
              {t('introP1Post')}
            </p>
          </div>

          {/* Hero image */}
          <figure className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.5)] mb-20" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/projects/orderbridge/orderbridge-cover.png"
              alt="OrderBridge OAuth 2.0 middleware dashboard showing real-time order synchronization between delivery platforms and POS systems"
              width={1200}
              height={630}
              priority
              className="w-full object-cover"
              itemProp="url contentUrl"
            />
            <meta itemProp="description" content="OrderBridge dashboard interface" />
            <meta itemProp="name" content="OrderBridge Dashboard Cover Image" />
          </figure>
        </section>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="w-[92%] max-w-[860px] mx-auto pb-24 space-y-20">

          {/* Section: The Brief */}
          <section>
            <SectionLabel>{t('brief.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6" itemProp="alternativeHeadline">
              {t('brief.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('brief.p1')}</p>
            </div>

            {/* Proposal document card */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden mb-8">
              <div className="border-b border-white/[0.06] px-6 py-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-text-secondary mb-1">{t('brief.proposalLabel')}</p>
                  <h3 className="text-lg font-bold text-text-primary">{t('brief.proposalTitle')}</h3>
                  <p className="font-mono text-xs text-text-secondary mt-1">{t('brief.proposalSubtitle')}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono text-xs text-text-secondary">Maximiliano B. Torres</p>
                  <p className="font-mono text-xs text-text-secondary">February 27, 2026</p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <p className="font-mono text-xs text-gold mb-2">{t('brief.descriptionLabel')}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{t('brief.descriptionText')}</p>
                </div>

                <div>
                  <p className="font-mono text-xs text-gold mb-2">{t('brief.objectiveLabel')}</p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">{t('brief.objectiveText')}</p>
                  <div className="space-y-2">
                    {objectives.map((item) => (
                      <div key={item.label} className="flex gap-3 text-sm">
                        <span className="text-gold mt-0.5 shrink-0">→</span>
                        <span>
                          <span className="text-text-primary font-medium">{item.label}:</span>{' '}
                          <span className="text-text-secondary">{item.desc}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-xs text-gold mb-3">{t('brief.architectureLabel')}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {archNodes.map((node, i, arr) => (
                      <div key={node} className="flex items-center gap-2">
                        <div className={`font-mono text-xs px-3 py-1.5 rounded-lg border ${i === 2 ? 'bg-gold/10 border-gold/40 text-gold' : 'border-white/[0.06] text-text-secondary'}`}>
                          {node}
                        </div>
                        {i < arr.length - 1 && <span className="text-text-secondary/40 text-xs">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <h3 className="text-lg font-bold text-text-primary mb-4">{t('brief.timelineHeading')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {weeks.map((w) => (
                <div key={w.week} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-gold/30 transition-colors">
                  <p className="font-mono text-xs text-gold mb-1">{w.week}</p>
                  <h4 className="text-sm font-bold text-text-primary mb-3">{w.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed mb-1">
                    <span className="text-text-primary">{t('brief.goalLabel')}:</span> {w.goal}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    <span className="text-text-primary">{t('brief.resultLabel')}:</span> {w.result}
                  </p>
                </div>
              ))}
            </div>

            {/* Core deliverables */}
            <h3 className="text-lg font-bold text-text-primary mb-4">{t('brief.deliverablesHeading')}</h3>
            <div className="space-y-3 mb-8">
              {deliverables.map((d) => (
                <div key={d.name} className="flex gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <span className="text-gold mt-0.5 shrink-0 font-mono text-sm">✓</span>
                  <div className="text-sm">
                    <span className="font-medium text-text-primary">{d.name}</span>
                    <span className="text-text-secondary"> — {d.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Prerequisites */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 mb-8">
              <p className="font-mono text-xs text-gold mb-3">{t('brief.prerequisitesLabel')}</p>
              <div className="space-y-2">
                {prerequisites.map((req) => (
                  <div key={req} className="flex gap-3 text-sm">
                    <span className="text-text-secondary/40 mt-0.5 shrink-0">—</span>
                    <span className="text-text-secondary">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/docs/projects/orderbridge/orderbridge-proposal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/[0.06] text-text-secondary px-5 py-2.5 rounded-lg font-display uppercase text-sm hover:border-gold/50 hover:text-text-primary transition-all"
            >
              {t('brief.downloadProposal')}
            </a>
          </section>

          {/* Section: The Pain Point */}
          <section>
            <SectionLabel>{t('painPoint.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('painPoint.heading')}
            </h2>
            <div className="prose-article">
              <p>{t('painPoint.p1')}</p>
              <p>{t('painPoint.listIntro')}</p>
              <ol>
                {listItems.map((item) => <li key={item}>{item}</li>)}
              </ol>
              <p>{t('painPoint.p2')}</p>
            </div>

            <ArticleCallout label={t('painPoint.mathLabel')}>
              {t('painPoint.mathPre')}{' '}
              <span className="text-gold font-bold">{t('painPoint.mathHighlight')}</span>{' '}
              {t('painPoint.mathPost')}
            </ArticleCallout>
          </section>

          {/* Screenshot: Orders page */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/projects/orderbridge/orderbridge-orders.png"
              alt="OrderBridge orders page with live order feed showing real-time filtering and status updates"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full object-cover"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figOrders')}
            </figcaption>
            <meta itemProp="description" content="OrderBridge orders page interface" />
          </figure>

          {/* Section: Engineering the Pipeline */}
          <section>
            <SectionLabel>{t('engineering.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('engineering.heading')}
            </h2>
            <div className="prose-article">
              <p>{t('engineering.p1')}</p>
            </div>

            <figure className="rounded-xl overflow-hidden border border-white/[0.06] my-8" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
              <Image
                src="/images/projects/orderbridge/orderbridge-diagram.png"
                alt="OrderBridge architecture diagram showing delivery platforms flowing through OrderBridge middleware into restaurant POS system"
                width={1200}
                height={675}
                loading="lazy"
                className="w-full object-cover"
                itemProp="url contentUrl"
              />
              <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
                {t('engineering.figDiagram')}
              </figcaption>
              <meta itemProp="description" content="OrderBridge system architecture diagram" />
            </figure>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              {steps.map((s) => (
                <div key={s.n} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-gold/30 transition-colors group">
                  <div className="font-mono text-3xl font-bold text-gold/20 group-hover:text-gold/40 transition-colors mb-3">{s.n}</div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">{s.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: The SRS */}
          <section>
            <SectionLabel>{t('process.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('process.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('process.p1')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requirements.map((r) => (
                <div key={r.label} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-gold/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-gold bg-gold/10 px-2 py-0.5 rounded">{r.label}</span>
                    <span className="text-sm font-bold text-text-primary">{r.title}</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Screenshot: Dashboard */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/projects/orderbridge/orderbridge-dashboard.png"
              alt="OrderBridge live dashboard showing real-time order feed with WebSocket updates and status tracking"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full object-cover"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figDashboard')}
            </figcaption>
            <meta itemProp="description" content="OrderBridge monitoring dashboard interface" />
          </figure>

          {/* Section: The Stack */}
          <section>
            <SectionLabel>{t('techStack.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              {t('techStack.heading')}
            </h2>
            <p className="text-text-secondary mb-8 leading-relaxed">{t('techStack.subtitle')}</p>

            <div className="space-y-4">
              {techItems.map((item) => (
                <div key={item.name} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-gold/30 transition-colors">
                  <div className="font-mono text-sm font-semibold text-gold mb-2">{item.name}</div>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Deployment */}
          <section>
            <SectionLabel>{t('deployment.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('deployment.heading')}
            </h2>
            <div className="prose-article mb-8">
              <p>{t('deployment.p1')}</p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 mb-8">
              <p className="font-mono text-xs text-gold mb-5">{t('deployment.infrastructureLabel')}</p>
              <div className="space-y-3">
                {services.map((s) => (
                  <div key={s.service} className="flex gap-4 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:border-gold/30 transition-colors">
                    <div className="shrink-0 text-right w-16 pt-0.5">
                      <span className="font-mono text-xs text-gold">{s.host}</span>
                    </div>
                    <div className="w-px bg-white/[0.06] shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-text-primary">{s.service}</span>
                        <span className="font-mono text-xs text-text-secondary border border-white/[0.06] px-2 py-0.5 rounded-full">{s.tag}</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ArticleCallout label={t('deployment.whySeparateLabel')}>
              <span className="text-sm">{t('deployment.whySeparate')}</span>
            </ArticleCallout>
          </section>

          {/* Section: The Hard Parts */}
          <section>
            <SectionLabel>{t('hardParts.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('hardParts.heading')}
            </h2>
            <div className="prose-article">
              <p>{t('hardParts.p1')}</p>
              <p>{t('hardParts.p2')}</p>
            </div>
          </section>

          {/* Screenshot: MockPOS */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/projects/orderbridge/orderbridge-mock-pos.png"
              alt="MockPOS terminal showing automated order injection from OrderBridge middleware"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full object-cover"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figMockPos')}
            </figcaption>
            <meta itemProp="description" content="MockPOS order terminal interface" />
          </figure>

          {/* Section: Introducing OrderBridge */}
          <section>
            <SectionLabel>{t('portfolio.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('portfolio.heading')}
            </h2>
            <div className="prose-article">
              <p>{t('portfolio.p1')}</p>
            </div>

            <div className="my-8 space-y-4">
              {portfolioReposWithUrls.map((repo) => (
                <div key={repo.name} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-gold/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-sm font-semibold text-gold">{repo.name}</div>
                    <a href={repo.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-gold transition-colors" aria-label={`View ${repo.name} on GitHub`}>
                      {githubIcon}
                    </a>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{repo.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Screenshot: Simulator */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <Image
              src="/images/projects/orderbridge/orderbridge-simulator.png"
              alt="OrderBridge order simulator page for testing delivery platform webhook integration"
              width={1200}
              height={675}
              loading="lazy"
              className="w-full object-cover"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-text-secondary text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              {t('figSimulator')}
            </figcaption>
            <meta itemProp="description" content="OrderBridge webhook simulator interface" />
          </figure>

          {/* Section: Source Code */}
          <section>
            <SectionLabel>{t('sourceCode.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('sourceCode.heading')}
            </h2>
            <p className="text-text-secondary mb-8 leading-relaxed">{t('sourceCode.subtitle')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {sourceReposWithUrls.map((repo) => (
                <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer" className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-gold/50 hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-text-primary group-hover:text-gold transition-colors">{repo.title}</h3>
                    <svg className="w-4 h-4 text-text-secondary group-hover:text-gold transition-colors flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed group-hover:text-[#8A8FA0] transition-colors">{repo.desc}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Section: Live Demos */}
          <section>
            <SectionLabel>{t('liveDemos.label')}</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              {t('liveDemos.heading')}
            </h2>
            <p className="text-text-secondary mb-8 leading-relaxed">{t('liveDemos.subtitle')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {demosWithUrls.map((demo) => (
                <a key={demo.url} href={demo.url} target="_blank" rel="noopener noreferrer" className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-gold/50 hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-text-primary group-hover:text-gold transition-colors">{demo.name}</h3>
                    <span className="text-lg mt-0.5">🔗</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed group-hover:text-[#8A8FA0] transition-colors mb-3">{demo.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-gold font-mono">{t('liveDemos.visitLabel')}</span>
                </a>
              ))}
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
              <a
                href="https://orderbridge.maxontorres.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-bg-dark px-6 py-3 rounded-lg font-display uppercase hover:bg-gold-strong transition-colors"
              >
                {t('cta.viewLiveDemo')}
                <span aria-hidden="true">→</span>
              </a>
              <Link
                href="/projects/orderbridge"
                className="inline-flex items-center gap-2 border border-white/[0.06] text-text-secondary px-6 py-3 rounded-lg font-display uppercase text-sm hover:border-gold/50 hover:text-text-primary transition-all"
              >
                {t('cta.fullCaseStudy')}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 border border-white/[0.06] text-text-secondary px-6 py-3 rounded-lg font-display uppercase text-sm hover:border-gold/50 hover:text-text-primary transition-all"
              >
                {t('cta.allArticles')}
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
