'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Heart, ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Locale, t } from '@/lib/i18n';

interface HeaderProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  cartCount?: number;
}

const navItems = [
  { key: 'newIn', href: '/new' },
  { key: 'clothing', href: '/shop/clothing' },
  { key: 'shoes', href: '/shop/shoes' },
  { key: 'bags', href: '/shop/bags' },
  { key: 'jewelry', href: '/shop/jewelry' },
];

export function Header({ locale, onLocaleChange, cartCount = 0 }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2.5 text-xs tracking-widest">
        COMPLIMENTARY SHIPPING ON ORDERS OVER €500
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            {/* Mobile Menu */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <h1 className="text-xl lg:text-2xl font-light tracking-[0.3em]">LUXURIA</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 ml-16">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-xs tracking-wider uppercase text-neutral-600 hover:text-black transition-colors"
                >
                  {t(locale, `nav.${item.key}`)}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-neutral-50 transition-colors hidden sm:block"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Language Selector */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="p-2 hover:bg-neutral-50 transition-colors flex items-center gap-1"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs uppercase">{locale}</span>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-1 bg-white border shadow-lg py-2 min-w-[100px]"
                    >
                      {(['en', 'de', 'sr'] as Locale[]).map((l) => (
                        <button
                          key={l}
                          onClick={() => {
                            onLocaleChange(l);
                            setLangOpen(false);
                          }}
                          className={cn(
                            'block w-full px-4 py-2 text-left text-xs uppercase hover:bg-neutral-50',
                            l === locale && 'font-medium'
                          )}
                        >
                          {l === 'en' ? 'English' : l === 'de' ? 'Deutsch' : 'Srpski'}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/account" className="p-2 hover:bg-neutral-50 transition-colors hidden sm:block">
                <User className="w-4 h-4" />
              </Link>

              <Link href="/favorites" className="p-2 hover:bg-neutral-50 transition-colors hidden sm:block">
                <Heart className="w-4 h-4" />
              </Link>

              <Link href="/cart" className="p-2 hover:bg-neutral-50 transition-colors relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 overflow-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-sm tracking-wider">MENU</span>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-lg tracking-wide hover:text-neutral-500 transition-colors"
                  >
                    {t(locale, `nav.${item.key}`)}
                  </Link>
                ))}
                <hr className="my-6" />
                <Link href="/account" className="block text-sm tracking-wide text-neutral-600">
                  {t(locale, 'auth.signIn')}
                </Link>
                <Link href="/favorites" className="block text-sm tracking-wide text-neutral-600">
                  Wishlist
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-sm tracking-wider">SEARCH</span>
              <button onClick={() => setSearchOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-start justify-center pt-24">
              <div className="w-full max-w-2xl px-4">
                <input
                  type="search"
                  placeholder="Search for products, designers..."
                  autoFocus
                  className="w-full text-2xl lg:text-4xl font-light border-b-2 border-black pb-4 focus:outline-none placeholder-neutral-300"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
