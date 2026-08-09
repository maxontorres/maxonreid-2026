'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';

export default function ReferralSection() {
  const t = useTranslations('referral');

  const steps = [
    t('steps.0'),
    t('steps.1'),
    t('steps.2'),
  ];

  return (
    <section
      id="referral"
      className="py-24 px-0 w-[92%] max-w-[1200px] mx-auto"
      aria-labelledby="referral-heading"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <span className="font-mono text-xs tracking-widest text-[#8A8FA0] mb-4 block">
          {t('label')}
        </span>
        <h2 id="referral-heading" className="text-4xl md:text-5xl font-bold mb-4">
          {t('title')}{' '}
          <span className="text-[#628DFF]">{t('titleAlt')}</span>
        </h2>
        <p className="text-xl text-[#8A8FA0] max-w-2xl mx-auto">
          {t('desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ── LEFT — Steps + CTA ── */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 flex flex-col gap-8">
          <div>
            <div className="font-mono text-xs text-[#8A8FA0] tracking-widest mb-5">
              {t('stepsLabel')}
            </div>
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-5 py-4 first:pt-0 last:pb-0">
                  <span className="font-mono text-xs font-bold text-[#628DFF] mt-0.5 shrink-0 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[#E8E9EC] text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href="https://wa.me/8562052373435"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-lg font-semibold transition-all bg-[#628DFF] hover:bg-[#675DFF] text-[#050608] flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
              {t('cta')}
            </a>
            <p className="font-mono text-xs text-[#8A8FA0] text-center">
              {t('phone')}
            </p>
          </div>
        </div>

        {/* ── RIGHT — Two options ── */}
        <div className="flex flex-col gap-4">
          <div className="font-mono text-xs text-[#374151] dark:text-[#8A8FA0] tracking-widest">
            {t('earn.label')}
          </div>

          {/* Option A */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.03] transition-colors flex-1">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[0.6rem] tracking-widest text-[#4b5563] dark:text-[#8A8FA0]">
                {t('optionA.label')}
              </span>
              <div className="text-right">
                <span className="font-mono text-4xl font-bold text-[#628DFF] leading-none block">
                  {t('optionA.amount')}
                </span>
                <span className="font-mono text-[0.6rem] tracking-widest text-[#4b5563] dark:text-[#8A8FA0]">
                  {t('optionA.unit')}
                </span>
              </div>
            </div>
            <div className="h-px bg-white/[0.06] mb-4" />
            <p className="text-sm text-[#374151] dark:text-[#8A8FA0] leading-relaxed mb-3">
              {t.rich('optionA.desc', {
                highlight: (chunks) => (
                  <span className="text-[#628DFF] font-semibold">{chunks}</span>
                ),
              })}
            </p>
            <p className="font-mono text-[0.6rem] tracking-wide !text-[#966D33] dark:text-[#c9a962]/75">
              {t('optionA.footer')}
            </p>
          </div>

          {/* Option B */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.03] transition-colors flex-1">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[0.6rem] tracking-widest text-[#4b5563] dark:text-[#8A8FA0]">
                {t('optionB.label')}
              </span>
              <div className="text-right">
                <span className="font-mono text-4xl font-bold text-[#628DFF] leading-none block">
                  {t('optionB.amount')}
                </span>
                <span className="font-mono text-[0.6rem] tracking-widest text-[#4b5563] dark:text-[#8A8FA0]">
                  {t('optionB.unit')}
                </span>
              </div>
            </div>
            <div className="h-px bg-white/[0.06] mb-4" />
            <p className="text-sm text-[#374151] dark:text-[#8A8FA0] leading-relaxed mb-3">
              {t.rich('optionB.desc', {
                highlight: (chunks) => (
                  <span className="text-[#628DFF] font-semibold">{chunks}</span>
                ),
              })}
            </p>
            <p className="font-mono text-[0.6rem] tracking-wide !text-[#966D33] dark:text-[#c9a962]/75">
              {t('optionB.footer')}
            </p>
          </div>

          <p className="font-mono text-[0.6rem] text-[#374151] dark:text-[#8A8FA0]/70 tracking-wide">
            {t('fine')}
          </p>
        </div>

      </div>
    </section>
  );
}
