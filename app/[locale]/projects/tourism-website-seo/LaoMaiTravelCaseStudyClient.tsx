'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-[#8A8FA0] hover:text-[#E8E9EC] font-mono text-sm transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        [ ESC ]
      </button>

      <button
        className="absolute left-6 text-[#8A8FA0] hover:text-[#628DFF] font-mono text-2xl transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        ←
      </button>

      <div
        className="max-w-5xl w-full mx-16 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          width={1200}
          height={750}
          className="w-full rounded-xl border border-white/[0.06]"
        />
        <p className="text-center font-mono text-sm text-[#8A8FA0]">
          {images[activeIndex].caption}
        </p>
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === activeIndex ? 'bg-[#628DFF]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <button
        className="absolute right-6 text-[#8A8FA0] hover:text-[#628DFF] font-mono text-2xl transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        →
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LaoMaiTravelCaseStudy() {
  const t = useTranslations('laomaitravelCaseStudy');
  const [screenshotLightbox, setScreenshotLightbox] = useState<number | null>(null);
  const [analyticsLightbox, setAnalyticsLightbox] = useState<number | null>(null);

  const outcomes = t.raw('outcomes') as { value: string; label: string }[];
  const problems = t.raw('problem.problems') as string[];
  const nextjsReasons = t.raw('nextjs.reasons') as { title: string; desc: string }[];
  const analyticsQuestions = t.raw('analytics.questions') as string[];
  const techStackItems = t.raw('techStack.items') as { name: string; reason: string }[];

  const screenshotImages = (t.raw('screenshots.images') as { alt: string; caption: string }[]).map(
    (img, i) => ({
      src: [
        '/images/projects/laomaitravel/destinations.png',
        '/images/projects/laomaitravel/tourpackages.png',
        '/images/projects/laomaitravel/contact-form.png',
        '/images/projects/laomaitravel/thai-language-translations.png',
      ][i],
      alt: img.alt,
      caption: img.caption,
    })
  );

  const analyticsImages = (t.raw('analytics.images') as { alt: string; caption: string }[]).map(
    (img, i) => ({
      src: [
        '/images/projects/laomaitravel/umami-main-dashboard.png',
        '/images/projects/laomaitravel/umami-pages-sources.png',
        '/images/projects/laomaitravel/umami-locations.png',
      ][i],
      alt: img.alt,
      caption: img.caption,
    })
  );

  return (
    <>
      <Header />

      {/* ── Lightboxes ── */}
      {screenshotLightbox !== null && (
        <Lightbox
          images={screenshotImages}
          activeIndex={screenshotLightbox}
          onClose={() => setScreenshotLightbox(null)}
          onNext={() => setScreenshotLightbox((i) => (i === null ? 0 : (i + 1) % screenshotImages.length))}
          onPrev={() => setScreenshotLightbox((i) => i === null ? 0 : (i - 1 + screenshotImages.length) % screenshotImages.length)}
        />
      )}
      {analyticsLightbox !== null && (
        <Lightbox
          images={analyticsImages}
          activeIndex={analyticsLightbox}
          onClose={() => setAnalyticsLightbox(null)}
          onNext={() => setAnalyticsLightbox((i) => (i === null ? 0 : (i + 1) % analyticsImages.length))}
          onPrev={() => setAnalyticsLightbox((i) => i === null ? 0 : (i - 1 + analyticsImages.length) % analyticsImages.length)}
        />
      )}

      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-0 w-[92%] max-w-[1200px] mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-sm text-[#8A8FA0] mb-10">
            <Link href="/" className="hover:text-[#628DFF] transition-colors">{t('breadcrumbHome')}</Link>
            <span>/</span>
            <Link href="/#work" className="hover:text-[#628DFF] transition-colors">{t('breadcrumbWork')}</Link>
            <span>/</span>
            <span className="text-[#628DFF]">Lao Mai Travel</span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['2025', 'Web', 'Bilingual', 'SEO', 'Analytics'].map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs border border-white/[0.06] text-[#8A8FA0] px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-[#E8E9EC] leading-none mb-6">
            Lao Mai<span className="text-[#628DFF]"> Travel</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-[#8A8FA0] max-w-2xl leading-relaxed mb-10">
            {t('tagline')}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="https://laomaitravel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#628DFF] text-[#050608] px-6 py-3 rounded-lg font-display uppercase hover:bg-[#675DFF] transition-colors"
            >
              {t('viewLive')}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Hero image */}
          <figure className="rounded-2xl overflow-hidden border border-white/[0.06] mt-8">
            <Image
              src="/images/projects/laomaitravel/hero-section.png"
              alt={t('heroImageAlt')}
              width={1200}
              height={800}
              priority
              className="w-full object-cover"
            />
          </figure>
        </section>

        {/* ── Outcomes ─────────────────────────────────────────────────────── */}
        <section className="py-20 w-[92%] max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {outcomes.map((o) => (
              <div
                key={o.label}
                className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#628DFF] mb-2 font-mono">
                  {o.value}
                </div>
                <div className="text-sm text-[#8A8FA0] leading-snug">{o.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Problem ──────────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            <div>
              <div className="font-mono text-sm text-[#8A8FA0] tracking-[8px] font-semibold sticky top-8">
                {t('problem.sectionLabel')}
              </div>
            </div>
            <div className="space-y-6 max-w-2xl">
              <p className="text-lg text-[#8A8FA0] leading-relaxed">{t('problem.p1')}</p>
              <p className="text-lg text-[#8A8FA0] leading-relaxed">{t('problem.p2')}</p>
              <div>
                <p className="text-lg text-[#8A8FA0] leading-relaxed mb-4">{t('problem.p3')}</p>
                <ul className="space-y-3">
                  {problems.map((problem, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#8A8FA0]">
                      <span className="font-mono text-[#628DFF] mt-0.5 shrink-0">0{i + 1}</span>
                      <span className="leading-relaxed">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Design ───────────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            <div>
              <div className="font-mono text-sm text-[#8A8FA0] tracking-[8px] font-semibold sticky top-8">
                {t('design.sectionLabel')}
              </div>
            </div>
            <div className="space-y-6 text-lg text-[#8A8FA0] leading-relaxed max-w-2xl">
              <p>{t('design.p1')}</p>
              <p>
                <span className="text-[#628DFF] font-semibold">Navy and gold</span>
                {' — '}{t('design.p2').replace('Navy and gold — ', '')}
              </p>
              <p>{t('design.p3')}</p>
              <p>{t('design.p4')}</p>
            </div>
          </div>
        </section>

        {/* ── Why Next.js ──────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto">
            <div className="font-mono text-sm text-[#8A8FA0] tracking-[8px] font-semibold mb-4">
              {t('nextjs.sectionLabel')}
            </div>
            <p className="text-lg text-[#8A8FA0] mb-12 max-w-2xl leading-relaxed">
              {t('nextjs.intro')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextjsReasons.map((reason, i) => (
                <div
                  key={i}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:border-[#628DFF]/30 transition-colors"
                >
                  <div className="font-mono text-4xl font-bold text-[#628DFF]/20 mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#E8E9EC] mb-3">{reason.title}</h3>
                  <p className="text-sm text-[#8A8FA0] leading-relaxed">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Analytics ────────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto">
            <div className="font-mono text-sm text-[#8A8FA0] tracking-[8px] font-semibold mb-6">
              {t('analytics.sectionLabel')}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 mb-16">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-[#E8E9EC]">{t('analytics.heading')}</h2>
                <p className="text-[#8A8FA0] leading-relaxed">{t('analytics.p1')}</p>
                <p className="text-[#8A8FA0] leading-relaxed">{t('analytics.p2')}</p>
                <p className="text-[#8A8FA0] leading-relaxed">{t('analytics.p3')}</p>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                <div className="font-mono text-xs text-[#8A8FA0] tracking-wider mb-5">
                  {t('analytics.questionsLabel')}
                </div>
                <ul className="space-y-4">
                  {analyticsQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#8A8FA0] leading-relaxed">
                      <span className="text-[#628DFF] font-mono shrink-0 mt-0.5">→</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Analytics screenshots */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analyticsImages.map((img, i) => (
                <button
                  key={i}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-white/[0.06] hover:border-[#628DFF]/50 transition-all text-left"
                  onClick={() => setAnalyticsLightbox(i)}
                  aria-label={`View analytics screenshot: ${img.caption}`}
                >
                  <Image
                    fill
                    src={img.src}
                    alt={img.alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="font-mono text-xs text-[#E8E9EC]">{img.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Screenshots ──────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto">
            <div className="font-mono text-sm text-[#8A8FA0] tracking-[8px] font-semibold mb-12">
              {t('screenshots.sectionLabel')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {screenshotImages.map((img, i) => (
                <button
                  key={i}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-white/[0.06] hover:border-[#628DFF]/50 transition-all text-left"
                  onClick={() => setScreenshotLightbox(i)}
                  aria-label={`View screenshot: ${img.caption}`}
                >
                  <Image
                    fill
                    src={img.src}
                    alt={img.alt}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="font-mono text-xs text-[#E8E9EC]">{img.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech Stack ───────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            <div>
              <div className="font-mono text-sm text-[#8A8FA0] tracking-[8px] font-semibold sticky top-8">
                {t('techStack.sectionLabel')}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techStackItems.map((tech) => (
                <div
                  key={tech.name}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#628DFF]/30 transition-colors"
                >
                  <div className="font-mono text-sm font-semibold text-[#628DFF] mb-2">
                    {tech.name}
                  </div>
                  <p className="text-sm text-[#8A8FA0] leading-relaxed">{tech.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto text-center">
            <div className="font-mono text-sm text-[#8A8FA0] tracking-[8px] font-semibold mb-6">
              {t('cta.sectionLabel')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E8E9EC] mb-4">
              {t('cta.heading')}
            </h2>
            <p className="text-[#8A8FA0] mb-10 max-w-lg mx-auto leading-relaxed">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#628DFF] text-[#050608] px-8 py-3 rounded-lg font-display uppercase hover:bg-[#675DFF] transition-colors"
              >
                {t('cta.talkButton')}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 border border-white/[0.06] text-[#8A8FA0] px-8 py-3 rounded-lg font-display uppercase text-sm hover:border-[#628DFF]/50 hover:text-[#E8E9EC] transition-all"
              >
                {t('cta.backToWork')}
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
