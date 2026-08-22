'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { useInView } from '@/app/hooks/useInView';
import styles from './index.module.css';

const TESTIMONIALS = [
  {
    id: 'laomaitravel',
    photo: '/images/socialproof/mr-lath-founder-from-laomaitravel.jpeg',
    caseStudyUrl: '/projects/tourism-website-seo',
  },
  {
    id: 'pmlaos',
    photo: '/images/socialproof/ping-silavong-from-pmlaos.png',
    caseStudyUrl: '/projects/real-estate-website-laos',
  },
];

export default function SocialProofSection() {
  const t = useTranslations('socialProof');
  const { ref: sectionRef, inView } = useInView({ threshold: 0.08 });

  return (
    <section
      id="social-proof"
      aria-labelledby="social-proof-heading"
      className={styles.section}
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className={styles.inner}>

        <header className={`${styles.header} ${inView ? styles.headerVisible : styles.headerHidden}`}>
          <p className={styles.sectionLabel}>{t('label')}</p>
          <h2 id="social-proof-heading" className={styles.title}>
            {t('title')}
          </h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </header>

        <div className={styles.testimonialGrid}>
          {TESTIMONIALS.map(({ id, photo, caseStudyUrl }, i) => (
            <article
              key={id}
              className={`${styles.card} ${inView ? styles.cardVisible : styles.cardHidden}`}
              style={{ '--i': i } as React.CSSProperties}
              aria-label={`Testimonial from ${t(`testimonials.${i}.author`)}`}
            >
              <blockquote className={styles.quote}>
                <span className={styles.quoteOpenMark} aria-hidden="true">&ldquo;</span>
                {t(`testimonials.${i}.quote`)}
              </blockquote>

              <footer className={styles.cardFooter}>
                <Image
                  src={photo}
                  alt={t(`testimonials.${i}.author`)}
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{t(`testimonials.${i}.author`)}</span>
                  <span className={styles.authorRole}>{t(`testimonials.${i}.role`)}</span>
                </div>
                <Link href={caseStudyUrl} className={styles.projectLink}>
                  {t('viewProject')} →
                </Link>
              </footer>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
