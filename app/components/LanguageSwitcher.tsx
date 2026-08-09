'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { US, LA, MX } from 'country-flag-icons/react/3x2';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const languages = [
    { code: 'en', label: 'English', flag: US },
    { code: 'es', label: 'Español', flag: MX },
    { code: 'lo', label: 'ລາວ', flag: LA }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
  const CurrentFlag = currentLanguage.flag;

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  const switchLanguage = (locale: string) => {
    if (locale === currentLocale) return;

    const currentPath = pathname || '';
    let newPath: string;

    // Remove current locale prefix if it exists
    let pathWithoutLocale = currentPath;
    if (currentPath.startsWith('/lo/') || currentPath === '/lo') {
      pathWithoutLocale = currentPath.replace(/^\/lo/, '');
    } else if (currentPath.startsWith('/es/') || currentPath === '/es') {
      pathWithoutLocale = currentPath.replace(/^\/es/, '');
    } else if (currentPath.startsWith('/en/') || currentPath === '/en') {
      pathWithoutLocale = currentPath.replace(/^\/en/, '');
    }

    // Ensure pathWithoutLocale starts with / if it's not empty
    if (pathWithoutLocale && !pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }

    // If path is empty, make it root
    if (!pathWithoutLocale) {
      pathWithoutLocale = '/';
    }

    // Add new locale prefix (both locales need prefix now)
    newPath = `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

    setIsOpen(false);

    // Use startTransition for better UX
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        className="bg-transparent border-none text-[#AEACA6] p-2 rounded-lg cursor-pointer inline-flex items-center gap-2 hover:bg-white/[0.03] relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Switch language"
        title="Switch language"
        disabled={isPending}
      >
        <CurrentFlag className="w-5 h-3.5 rounded object-cover" />
        <span className="text-xs tracking-wider">{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="fixed min-w-[140px] bg-[#111111] border border-white/10 rounded-lg p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)] z-[10003] animate-[slideDown_0.2s_ease]"
          style={{ top: `${dropdownPos.top}px`, right: `${dropdownPos.right}px` }}
        >
          {languages.map((lang) => {
            const FlagComponent = lang.flag;
            return (
              <button
                key={lang.code}
                className={`flex items-center gap-2.5 w-full p-2.5 pl-3 bg-transparent border-none rounded-lg text-sm cursor-pointer transition-all ${
                  lang.code === currentLocale
                    ? 'bg-[#D4A843]/10 text-[#D4A843] font-semibold'
                    : 'text-[#F0EDE6] hover:bg-white/[0.03]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => switchLanguage(lang.code)}
                disabled={lang.code === currentLocale || isPending}
              >
                <FlagComponent className="w-5 h-3.5 rounded object-cover" />
                <span className="flex-1 text-left font-medium">{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[10001]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
