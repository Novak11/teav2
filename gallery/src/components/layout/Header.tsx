'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Locale, t } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const navItems = [
  { key: 'gallery', href: '/gallery', num: '01' },
  { key: 'artists', href: '/artists', num: '02' },
  { key: 'exhibitions', href: '/exhibitions', num: '03' },
  { key: 'about', href: '/about', num: '04' },
  { key: 'contact', href: '/contact', num: '05' },
];

export function Header({ locale, onLocaleChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-void-black border-b-2 border-gray-800">
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-3xl lg:text-4xl font-black tracking-tighter text-void-white">
              {t(locale, 'brand')}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-gray-500 mt-1">
              {t(locale, 'tagline')}
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-1 border border-gray-700">
              {(['en', 'de', 'sr'] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onLocaleChange(l)}
                  className={cn(
                    'px-2 py-1 text-xs font-mono uppercase transition-colors',
                    l === locale
                      ? 'bg-void-white text-void-black'
                      : 'text-gray-500 hover:text-void-white'
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 text-void-white hover:text-void-red transition-colors"
            >
              <span className="text-xs font-mono tracking-wider">MENU</span>
              <div className="flex flex-col gap-1">
                <span className="w-6 h-0.5 bg-current" />
                <span className="w-6 h-0.5 bg-current" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-void-black flex flex-col"
          >
            {/* Close Button */}
            <div className="flex justify-end p-4 lg:p-8">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-void-white hover:text-void-red transition-colors"
              >
                <span className="text-4xl font-mono">[×]</span>
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 flex flex-col justify-center px-8 lg:px-16">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-4 border-b border-gray-800"
                  >
                    <span className="text-sm font-mono text-gray-600">
                      {item.num}
                    </span>
                    <span className="text-4xl lg:text-6xl font-black text-void-white group-hover:text-void-red group-hover:line-through transition-all">
                      {t(locale, `nav.${item.key}`)}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom */}
            <div className="p-8 flex items-center justify-between border-t border-gray-800">
              <div className="flex gap-4 text-xs font-mono text-gray-500">
                <a href="#" className="hover:text-void-white">INSTAGRAM</a>
                <a href="#" className="hover:text-void-white">TWITTER</a>
              </div>
              <div className="flex gap-1">
                {(['en', 'de', 'sr'] as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => onLocaleChange(l)}
                    className={cn(
                      'px-2 py-1 text-xs font-mono uppercase',
                      l === locale ? 'bg-void-white text-void-black' : 'text-gray-500'
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
