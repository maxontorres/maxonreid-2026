'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/routing';

import LanguageSwitcher from './LanguageSwitcher';
import Navbar from './Navbar';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[9999] min-h-[72px] backdrop-blur-md border-b transition-all ${isScrolled ? 'shadow-[0_6px_20px_rgba(0,0,0,0.12)]' : ''}`}
      style={{
        backgroundColor: 'rgba(var(--bg-primary-rgb, 8, 8, 8), 0.6)',
        borderColor: 'var(--border-color)'
      }}
      role="banner"
    >
      <div className="w-[92%] max-w-[1200px] mx-auto flex items-center justify-between py-3.5">

        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/logo-maxontorres.png"
            alt="Maxon Torres"
            width={40}
            height={40}
            priority
          />
        </Link>

        <Navbar />

        <div className="flex gap-3 items-center">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
