'use client';

import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { Globe, LayoutDashboard, Settings } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';

const Header = () => {
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = (params.locale as string) || 'ru';

  const getRedirectPath = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/');
    // segments[0] is empty, segments[1] is the locale
    if (segments[1] === 'ru' || segments[1] === 'en' || segments[1] === 'uz') {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }
    return segments.join('/') || '/';
  };

  return (
    <header
      className="border-b border-compass-text-muted/10 bg-white/80 backdrop-blur-md py-5 px-8 md:px-12 flex items-center justify-between sticky top-0 z-50"
      style={{ borderRadius: 0 }}
    >
      <Link href={`/${currentLocale}`}>
        <Logo />
      </Link>

      <nav className="hidden md:flex items-center gap-10">
        <Link
          href={`/${currentLocale}/dashboard`}
          className="flex items-center gap-2 font-bold uppercase tracking-[0.15em] text-[11px] text-compass-heading-secondary hover:opacity-70 transition-opacity"
        >
          <LayoutDashboard size={14} /> {currentLocale === 'en' ? 'Dashboard' : currentLocale === 'uz' ? 'Kabinet' : 'Кабинет'}
        </Link>
        <Link
          href={`/${currentLocale}/admin/builder`}
          className="flex items-center gap-2 font-bold uppercase tracking-[0.15em] text-[11px] text-compass-heading-secondary hover:opacity-70 transition-opacity"
        >
          <Settings size={14} /> {currentLocale === 'en' ? 'Constructor' : currentLocale === 'uz' ? 'Konstruktor' : 'Конструктор'}
        </Link>
      </nav>

      <div className="flex items-center gap-6">
        <div
          className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest text-compass-heading-secondary"
        >
          <Globe size={14} className="opacity-60" />
          <Link href={getRedirectPath('ru')} className={`hover:opacity-100 transition-opacity ${currentLocale === 'ru' ? 'underline underline-offset-4 decoration-2' : 'opacity-50'}`}>RU</Link>
          <span className="opacity-30">|</span>
          <Link href={getRedirectPath('en')} className={`hover:opacity-100 transition-opacity ${currentLocale === 'en' ? 'underline underline-offset-4 decoration-2' : 'opacity-50'}`}>EN</Link>
          <span className="opacity-30">|</span>
          <Link href={getRedirectPath('uz')} className={`hover:opacity-100 transition-opacity ${currentLocale === 'uz' ? 'underline underline-offset-4 decoration-2' : 'opacity-50'}`}>UZ</Link>
        </div>
        <div
          className="w-9 h-9 bg-compass-button-bg flex items-center justify-center font-black text-compass-button-text text-xs"
        >
          CM
        </div>
      </div>
    </header>
  );
};

export default Header;
