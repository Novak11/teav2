'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBagIcon, HeartIcon, UserIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { getTranslation, Language } from '@/lib/translations';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ lang, onLanguageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCartStore();
  const { isAuthenticated, logout } = useAuthStore();

  const t = (key: string) => getTranslation(lang, key);

  const navigation = [
    { name: t('nav.clothing'), href: '/shop/clothing' },
    { name: t('nav.footwear'), href: '/shop/footwear' },
    { name: t('nav.jewelry'), href: '/shop/jewelry' },
    { name: t('nav.bags'), href: '/shop/bags' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p>Free shipping on orders over €500</p>
          <div className="flex items-center space-x-4">
            <select
              value={lang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-white text-xs border-none focus:ring-0 cursor-pointer"
            >
              <option value="en" className="text-black">English</option>
              <option value="de" className="text-black">Deutsch</option>
              <option value="sr" className="text-black">Srpski</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold tracking-wider">LUXURIA</h1>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-gray-500 ${
                  pathname.startsWith(item.href) ? 'text-black border-b-2 border-black' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {isAuthenticated ? (
              <>
                <Link href="/favorites" className="p-2 hover:bg-gray-100 rounded-full">
                  <HeartIcon className="h-5 w-5" />
                </Link>
                <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full">
                  <UserIcon className="h-5 w-5" />
                </Link>
              </>
            ) : (
              <Link href="/login" className="text-sm font-medium hover:text-gray-500">
                {t('nav.login')}
              </Link>
            )}

            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingBagIcon className="h-5 w-5" />
              {cart && cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="py-4 border-t">
            <form action="/search" className="flex">
              <input
                type="search"
                name="q"
                placeholder="Search for products..."
                className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-serif font-bold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-lg font-medium hover:text-gray-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-4" />
              {isAuthenticated ? (
                <>
                  <Link href="/profile" className="block text-lg font-medium hover:text-gray-500">
                    {t('nav.profile')}
                  </Link>
                  <Link href="/favorites" className="block text-lg font-medium hover:text-gray-500">
                    {t('nav.favorites')}
                  </Link>
                  <button onClick={logout} className="block text-lg font-medium hover:text-gray-500">
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block text-lg font-medium hover:text-gray-500">
                    {t('nav.login')}
                  </Link>
                  <Link href="/register" className="block text-lg font-medium hover:text-gray-500">
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
