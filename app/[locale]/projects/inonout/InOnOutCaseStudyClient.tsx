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

export default function InOnOutCaseStudy() {
  const t = useTranslations('inonoutCaseStudy');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const outcomes = t.raw('outcomes') as { value: string; label: string }[];
  const steps = t.raw('howItWorks.steps') as { step: string; title: string; desc: string }[];
  const archNodes = t.raw('solution.archNodes') as string[];
  const galleryImages = (t.raw('screenshots.images') as { alt: string; caption: string }[]).map(
    (img, i) => ({
      src: [
        '/images/projects/inonout/inonout-cover.png',
        '/images/projects/inonout/inonout-courses.png',
        '/images/projects/inonout/inonout-tutor-dashboard.png',
      ][i],
      alt: img.alt,
      caption: img.caption,
    })
  );
  const techStackItems = t.raw('techStack.items') as { name: string; reason: string }[];

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % galleryImages.length));
  const prevImage = () =>
    setLightboxIndex((i) =>
      i === null ? 0 : (i - 1 + galleryImages.length) % galleryImages.length
    );

  return (
    <>
      <Header />

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}

      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-20 w-[92%] max-w-[1200px] mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-sm text-[#8A8FA0] mb-10">
            <Link href="/" className="hover:text-[#628DFF] transition-colors">{t('breadcrumbHome')}</Link>
            <span>/</span>
            <Link href="/#work" className="hover:text-[#628DFF] transition-colors">{t('breadcrumbWork')}</Link>
            <span>/</span>
            <span className="text-[#628DFF]">InOnOut</span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['2026', 'E-Learning', 'Full-Stack', 'Marketplace'].map((tag) => (
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
            In<span className="text-[#628DFF]">On</span>Out
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-[#8A8FA0] max-w-2xl leading-relaxed mb-10">
            {t('tagline')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="https://inonout.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#628DFF] text-[#050608] px-6 py-3 rounded-lg font-display uppercase hover:bg-[#675DFF] transition-colors"
            >
              {t('viewLiveSite')}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* ── Outcomes ─────────────────────────────────────────────────────── */}
        <section className="py-20 w-[92%] max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {outcomes.map((o) => (
              <div
                key={o.label}
                className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#628DFF] mb-2 font-mono">
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
            <div className="space-y-6 text-lg text-[#8A8FA0] leading-relaxed max-w-2xl">
              <p>{t('problem.p1')}</p>
              <p>{t('problem.p2')}</p>
              <p>
                {t('problem.p3')}{' '}
                <span className="text-[#628DFF] font-semibold">{t('problem.p3Highlight')}</span>{' '}
                {t('problem.p3End')}
              </p>
            </div>
          </div>
        </section>

        {/* ── Solution ─────────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            <div>
              <div className="font-mono text-sm text-[#8A8FA0] tracking-[8px] font-semibold sticky top-8">
                {t('solution.sectionLabel')}
              </div>
            </div>
            <div className="space-y-8 max-w-2xl">
              <p className="text-lg text-[#8A8FA0] leading-relaxed">
                {t('solution.p1')}
              </p>

              {/* Architecture flow */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                <div className="font-mono text-xs text-[#8A8FA0] mb-6 tracking-wider">
                  {t('solution.archTitle')}
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 font-mono text-sm">
                  {archNodes.flatMap((label, i) => {
                    const items = [
                      <div
                        key={label}
                        className={`bg-white/[0.03] border rounded-lg px-3 py-2 text-center text-xs leading-tight whitespace-pre-line ${
                          i === 0 ? 'arch-node-platform' : i === archNodes.length - 1 ? 'arch-node-pos' : 'arch-node-middleware'
                        }`}
                      >
                        {label}
                      </div>,
                    ];
                    if (i < archNodes.length - 1) {
                      items.push(
                        <span key={`arrow-${i}`} className="text-[#8A8FA0] text-lg leading-none">
                          <span className="hidden sm:inline">→</span>
                          <span className="sm:hidden">↓</span>
                        </span>
                      );
                    }
                    return items;
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06] font-mono text-xs text-[#8A8FA0]">
                  {t('solution.wsLabel')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto">
            <div className="font-mono text-sm text-[#8A8FA0] tracking-[8px] font-semibold mb-12">
              {t('howItWorks.sectionLabel')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step) => (
                <div
                  key={step.step}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:border-[#628DFF]/30 transition-colors group"
                >
                  <div className="font-mono text-4xl font-bold text-[#628DFF]/20 group-hover:text-[#628DFF]/40 transition-colors mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-[#E8E9EC] mb-3">{step.title}</h3>
                  <p className="text-[#8A8FA0] leading-relaxed text-sm">{step.desc}</p>
                </div>
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
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-white/[0.06] hover:border-[#628DFF]/50 transition-all text-left"
                  onClick={() => openLightbox(i)}
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
