'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/routing';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('nav');
  const locale = useLocale();

  const normalizedPath = pathname?.replace(/\/$/, '') || '';
  const isHomePage = normalizedPath === `/${locale}` || normalizedPath === '' || normalizedPath === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Added 'referral' to tracked sections
      const sections = ['work', 'services', 'referral', 'contact'];
      const current = sections.find(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      } else if (scrollTop < 100) {
        setActiveSection('');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const headerHeight = 100;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          setActiveSection(hash);
        }
      }, 100);
    }
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();

    if (!isHomePage) {
      router.push(`/${locale}#${hash}`);
      setIsMenuOpen(false);
      return;
    }

    const element = document.getElementById(hash);
    if (element) {
      const headerHeight = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      window.history.pushState(null, '', `/${locale}#${hash}`);
      setActiveSection(hash);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="relative" aria-label="Primary navigation">
      <div className="flex items-center gap-[18px]">

        {/* Desktop menu */}
        <div className="hidden md:flex gap-[18px] items-center">

          <Link
            href="/about"
            className={`nav-link ${pathname?.includes('/about') ? 'nav-link-active' : ''}`}
            locale={locale}
          >
            {t('about')}
          </Link>

          <Link
            href={`/#work`}
            className={`nav-link ${activeSection === 'work' ? 'nav-link-active' : ''}`}
            onClick={(e) => handleHashClick(e, 'work')}
            locale={locale}
          >
            {t('work')}
          </Link>

          <Link
            href="/articles"
            className={`nav-link ${pathname?.includes('/articles') ? 'nav-link-active' : ''}`}
            locale={locale}
          >
            {t('blog')}
          </Link>

          <Link
            href={`/#services`}
            className={`nav-link ${activeSection === 'services' ? 'nav-link-active' : ''}`}
            onClick={(e) => handleHashClick(e, 'services')}
            locale={locale}
          >
            {t('services')}
          </Link>

          {/* ── REFERRAL LINK ── */}
          <Link
            href={`/#referral`}
            className={`nav-link ${activeSection === 'referral' ? 'nav-link-active' : ''}`}
            onClick={(e) => handleHashClick(e, 'referral')}
            locale={locale}
          >
            {/* pulsing $ badge */}
            <span className="relative inline-flex items-center justify-center w-3.5 h-3.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-current opacity-20 animate-ping" />
              <span className="relative font-mono text-[0.6rem] font-bold leading-none">$</span>
            </span>
            {t('referral')}
          </Link>

          <Link
            href={`/#contact`}
            className={`nav-link ${activeSection === 'contact' ? 'nav-link-active' : ''}`}
            onClick={(e) => handleHashClick(e, 'contact')}
            locale={locale}
          >
            {t('contact')}
          </Link>

        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--nav-text)] transition-colors hover:bg-[var(--nav-hover-bg)] hover:text-[var(--nav-active)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nav-active)] md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen
            ? <X size={18} strokeWidth={1.75} aria-hidden="true" />
            : <Menu size={18} strokeWidth={1.75} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed right-2 top-[4.5rem] z-50 flex w-56 max-w-[calc(100vw-1rem)] origin-top-right flex-col gap-1 rounded-xl border p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-md md:hidden"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <Link
            href="/about"
            className={`rounded-lg px-3 py-2 text-left text-sm font-semibold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nav-active)] ${pathname?.includes('/about') ? 'text-[var(--nav-active)] bg-[var(--nav-hover-bg)]' : 'text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'}`}
            locale={locale}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('about')}
          </Link>

          <Link
            href={`/#work`}
            className={`rounded-lg px-3 py-2 text-left text-sm font-semibold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nav-active)] ${activeSection === 'work' ? 'text-[var(--nav-active)] bg-[var(--nav-hover-bg)]' : 'text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'}`}
            onClick={(e) => handleHashClick(e, 'work')}
            locale={locale}
          >
            {t('work')}
          </Link>

          <Link
            href="/articles"
            className={`rounded-lg px-3 py-2 text-left text-sm font-semibold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nav-active)] ${pathname?.includes('/articles') ? 'text-[var(--nav-active)] bg-[var(--nav-hover-bg)]' : 'text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'}`}
            locale={locale}
            onClick={() => setIsMenuOpen(false)}
          >
            {t('blog')}
          </Link>

          <Link
            href={`/#services`}
            className={`rounded-lg px-3 py-2 text-left text-sm font-semibold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nav-active)] ${activeSection === 'services' ? 'text-[var(--nav-active)] bg-[var(--nav-hover-bg)]' : 'text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'}`}
            onClick={(e) => handleHashClick(e, 'services')}
            locale={locale}
          >
            {t('services')}
          </Link>

          <Link
            href={`/#contact`}
            className={`rounded-lg px-3 py-2 text-left text-sm font-semibold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nav-active)] ${activeSection === 'contact' ? 'text-[var(--nav-active)] bg-[var(--nav-hover-bg)]' : 'text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'}`}
            onClick={(e) => handleHashClick(e, 'contact')}
            locale={locale}
          >
            {t('contact')}
          </Link>

          {/* ── REFERRAL LINK (mobile) ── */}
          <Link
            href={`/#referral`}
            className={`rounded-lg px-3 py-2 text-left text-sm font-semibold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nav-active)] inline-flex items-center gap-2 ${activeSection === 'referral' ? 'text-[var(--nav-active)] bg-[var(--nav-hover-bg)]' : 'text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'}`}
            onClick={(e) => handleHashClick(e, 'referral')}
            locale={locale}
          >
            <span className="relative inline-flex items-center justify-center w-3.5 h-3.5 shrink-0">
              <span className="absolute inline-flex w-full h-full rounded-full bg-current opacity-20 animate-ping" />
              <span className="relative font-mono text-[0.6rem] font-bold leading-none">$</span>
            </span>
            {t('referral')}
          </Link>

        </div>
      )}
    </nav>
  );
}