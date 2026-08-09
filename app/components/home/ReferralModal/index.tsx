'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { MessageCircle, X } from 'lucide-react'

export default function ReferralModal() {
  const t = useTranslations('referral')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('referral_modal_seen')
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    if (visible) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [visible])

  const dismiss = () => {
    sessionStorage.setItem('referral_modal_seen', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease_both] max-sm:items-end max-sm:p-0"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label={t('modal.ariaLabel')}
    >
      <div
        className="w-full max-w-[560px] bg-[#0D0F16] border border-white/[0.08] rounded-xl relative shadow-[0_40px_80px_rgba(0,0,0,0.8)] animate-[modalIn_0.35s_cubic-bezier(0.16,1,0.3,1)_both] max-sm:max-w-full max-sm:rounded-b-none max-sm:max-h-[92dvh] max-sm:overflow-y-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── DECORATIVE DOLLAR SIGN ── */}
        <svg
          className="absolute top-0 right-0 w-[280px] h-[280px] opacity-[0.08] pointer-events-none max-sm:w-[200px] max-sm:h-[200px]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="dollarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#628DFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#f4d799" stopOpacity="1" />
              <stop offset="100%" stopColor="#628DFF" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <text
            x="50"
            y="70"
            fontSize="80"
            fontWeight="bold"
            textAnchor="middle"
            fill="url(#dollarGradient)"
            filter="url(#glow)"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            $
          </text>
        </svg>

        {/* ── TOP BAR ── */}
        <div className="flex justify-between items-center pl-5 pr-12 py-3 border-b border-white/[0.06] rounded-t-xl bg-white/[0.02]">
          <span className="font-mono text-[0.6rem] tracking-widest text-[#8A8FA0]">
            MAXONTORRES.COM
          </span>
          <div className="flex items-center gap-1.5 font-mono text-[0.6rem] text-[#628DFF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#628DFF] animate-[blink_2s_step-end_infinite]" />
            {t('modal.badge')}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="px-6 pt-6 max-sm:px-4 max-sm:pt-4">
          <span className="font-mono text-[0.6rem] tracking-widest text-[#8A8FA0] block mb-5">
            {t('label')}
          </span>

          <h2 className="text-2xl font-bold text-[#E8E9EC] leading-snug tracking-tight mb-4">
            {t('title')}{' '}
            <span className="text-[#628DFF]">{t('titleAlt')}</span>
          </h2>

          <div className="h-px bg-white/[0.06] -mx-6 mb-5" />

          {/* Options */}
          <div className="flex flex-col gap-3 mb-5 max-sm:gap-2 max-sm:mb-3">

            {/* Option A - cash */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.03] transition-colors">
              <div className="flex justify-between items-start mb-3">
                <span className="font-mono text-[0.55rem] tracking-widest text-[#8A8FA0]">
                  {t('optionA.label')}
                </span>
                <div className="text-right leading-none">
                  <span className="font-mono text-3xl font-bold text-[#628DFF] tracking-tight block max-sm:text-2xl">
                    {t('optionA.amount')}
                  </span>
                  <span className="font-mono text-[0.55rem] tracking-widest text-[#8A8FA0]">
                    {t('optionA.unit')}
                  </span>
                </div>
              </div>
              <div className="h-px bg-white/[0.06] mb-3" />
              <p className="text-sm text-[#8A8FA0] leading-relaxed">
                {t.rich('optionA.desc', {
                  highlight: (chunks) => (
                    <span className="font-semibold text-[#628DFF] bg-[#628DFF]/12 px-1.5 py-0.5 rounded">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
            </div>

            {/* Option B */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.03] transition-colors">
              <div className="flex justify-between items-start mb-3">
                <span className="font-mono text-[0.55rem] tracking-widest text-[#8A8FA0]">
                  {t('optionB.label')}
                </span>
                <div className="text-right leading-none">
                  <span className="font-mono text-3xl font-bold text-[#628DFF] tracking-tight block max-sm:text-2xl">
                    {t('optionB.amount')}
                  </span>
                  <span className="font-mono text-[0.55rem] tracking-widest text-[#8A8FA0]">
                    {t('optionB.unit')}
                  </span>
                </div>
              </div>
              <div className="h-px bg-white/[0.06] mb-3" />
              <p className="text-sm text-[#8A8FA0] leading-relaxed">
                {t.rich('optionB.desc', {
                  highlight: (chunks) => (
                    <span className="font-semibold text-[#628DFF] bg-[#628DFF]/12 px-1.5 py-0.5 rounded">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
            </div>

          </div>
        </div>

        {/* ── CTA ── */}
        <div className="px-6 pb-6 flex flex-col gap-3 max-sm:px-4 max-sm:pb-4">
          <a
            href="https://wa.me/8562052373435"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-lg font-display uppercase transition-all bg-[#628DFF] hover:bg-[#675DFF] text-[#050608] flex items-center justify-center gap-2"
            onClick={dismiss}
          >
            <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
            {t('cta')}
          </a>
          <div className="flex justify-between items-center">
            <span className="font-mono text-[0.6rem] text-[#8A8FA0] tracking-wide">
              {t('phone')}
            </span>
            <button
              onClick={dismiss}
              className="font-mono text-[0.6rem] tracking-widest text-[#8A8FA0] bg-transparent border-none cursor-pointer transition-colors hover:text-[#E8E9EC]"
            >
              {t('modal.dismiss')}
            </button>
          </div>
        </div>

        {/* ── FOOTER BAR ── */}
        <div className="flex justify-between items-center px-5 py-3 border-t border-white/[0.06] rounded-b-xl bg-white/[0.02]">
          <span className="font-mono text-[0.55rem] text-[#8A8FA0] tracking-wide">
            MAXON TORRES · VIENTIANE : LAOS PDR
          </span>
          <span className="font-mono text-[0.55rem] text-[#8A8FA0]/60">
            {t('fine')}
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-4 text-[#8A8FA0] bg-transparent border-none cursor-pointer p-0.5 transition-colors hover:text-[#E8E9EC]"
        >
          <X size={14} strokeWidth={2} />
        </button>

      </div>
    </div>
  )
}
