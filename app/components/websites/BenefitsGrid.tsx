'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from '@/app/hooks/useInView';
import styles from './BenefitsGrid.module.css';

export default function BenefitsGrid() {
  const t = useTranslations('websites.benefits');
  const { ref: sectionRef, inView } = useInView();

  const benefits = [
    {
      title: t('items.googleFound.title'),
      desc: t('items.googleFound.desc'),
      icon: (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="17" stroke="#628DFF" strokeWidth="0.75" />
          <circle cx="18" cy="18" r="10" stroke="#628DFF" strokeWidth="0.75" />
          <ellipse cx="18" cy="18" rx="6" ry="17" stroke="#628DFF" strokeWidth="0.75" />
          <line x1="1" y1="18" x2="35" y2="18" stroke="#628DFF" strokeWidth="0.75" />
          <circle cx="18" cy="18" r="2" fill="#628DFF" />
        </svg>
      ),
    },
    {
      title: t('items.multiLanguage.title'),
      desc: t('items.multiLanguage.desc'),
      icon: (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <rect x="2" y="6" width="32" height="24" rx="2" stroke="#628DFF" strokeWidth="0.75" />
          <rect x="7" y="12" width="8" height="5" rx="1" stroke="#628DFF" strokeWidth="0.75" />
          <rect x="20" y="12" width="8" height="5" rx="1" stroke="#628DFF" strokeWidth="0.75" />
          <line x1="7" y1="21" x2="29" y2="21" stroke="#628DFF" strokeWidth="0.75" />
          <line x1="7" y1="24" x2="20" y2="24" stroke="#628DFF" strokeWidth="0.75" />
        </svg>
      ),
    },
    {
      title: t('items.ownership.title'),
      desc: t('items.ownership.desc'),
      icon: (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M18 2L33 10V26L18 34L3 26V10L18 2Z" stroke="#628DFF" strokeWidth="0.75" />
          <path d="M18 10L25 14V22L18 26L11 22V14L18 10Z" stroke="#628DFF" strokeWidth="0.75" />
          <circle cx="18" cy="18" r="3" fill="#628DFF" />
        </svg>
      ),
    },
    {
      title: t('items.analytics.title'),
      desc: t('items.analytics.desc'),
      icon: (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <rect x="4" y="20" width="5" height="12" rx="1" fill="#628DFF" opacity="0.3" />
          <rect x="11" y="14" width="5" height="18" rx="1" fill="#628DFF" opacity="0.5" />
          <rect x="18" y="8" width="5" height="24" rx="1" fill="#628DFF" opacity="0.7" />
          <rect x="25" y="4" width="5" height="28" rx="1" fill="#628DFF" />
          <line x1="2" y1="34" x2="34" y2="34" stroke="#628DFF" strokeWidth="0.75" />
        </svg>
      ),
    },
    {
      title: t('items.trust.title'),
      desc: t('items.trust.desc'),
      icon: (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="14" r="7" stroke="#628DFF" strokeWidth="0.75" />
          <path d="M8 30c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#628DFF" strokeWidth="0.75" strokeLinecap="round" />
          <circle cx="18" cy="14" r="3" fill="#628DFF" opacity="0.5" />
        </svg>
      ),
    },
    {
      title: t('items.delivered.title'),
      desc: t('items.delivered.desc'),
      icon: (
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="28" height="28" rx="2" stroke="#628DFF" strokeWidth="0.75" />
          <path d="M12 18l4 4 8-8" stroke="#628DFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className={styles.section} ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t('eyebrow')}</p>
          <h2 className={styles.title}>
            {t('title')}
          </h2>
          <p className={styles.intro}>
            {t('intro')}
          </p>
        </header>
        <ul className={styles.grid} role="list">
          {benefits.map((b, i) => (
            <li
              key={b.title}
              className={`${styles.card} ${inView ? styles.cardVisible : styles.cardHidden}`}
              style={{ '--i': i } as React.CSSProperties}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const { left, top, width, height } = el.getBoundingClientRect();
                el.style.setProperty('--mouse-x', `${((e.clientX - left) / width) * 100}%`);
                el.style.setProperty('--mouse-y', `${((e.clientY - top) / height) * 100}%`);
              }}
            >
              <span className={styles.icon}>{b.icon}</span>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardDesc}>{b.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
