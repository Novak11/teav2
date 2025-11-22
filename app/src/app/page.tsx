'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Locale, t } from '@/lib/i18n';
import { sampleProducts, sampleCategories, getLocalizedField } from '@/lib/data';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const featuredProducts = sampleProducts.filter((p) => p.isFeatured);
  const newProducts = sampleProducts.filter((p) => p.isNew);

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} onLocaleChange={setLocale} cartCount={0} />

      <main>
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] bg-neutral-100 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
              alt="Luxury Fashion"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
          </div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="relative h-full max-w-screen-2xl mx-auto px-4 lg:px-8 flex items-center"
          >
            <div className="max-w-xl">
              <motion.span
                variants={fadeInUp}
                className="inline-block text-white/80 text-xs tracking-[0.3em] mb-6"
              >
                {t(locale, 'home.heroSubtitle')}
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-8"
              >
                {t(locale, 'home.heroTitle')}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-white/70 text-lg mb-10 font-light"
              >
                {t(locale, 'home.heroDescription')}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex gap-4">
                <Link href="/shop">
                  <Button size="lg">{t(locale, 'common.shopNow')}</Button>
                </Link>
                <Link href="/new">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                    {t(locale, 'nav.newIn')}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 lg:py-28">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl lg:text-3xl font-light mb-4">{t(locale, 'home.shopByCategory')}</h2>
              <p className="text-neutral-500 text-sm">{t(locale, 'home.exploreCollections')}</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {sampleCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/shop/${category.slug}`}
                    className="group block relative aspect-[3/4] overflow-hidden bg-neutral-100"
                  >
                    <Image
                      src={category.image}
                      alt={getLocalizedField(category, 'name', locale)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-lg tracking-wide mb-1">
                        {getLocalizedField(category, 'name', locale)}
                      </h3>
                      <span className="text-white/70 text-xs tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t(locale, 'common.explore')} <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 lg:py-28 bg-neutral-50">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl lg:text-3xl font-light mb-2"
                >
                  {t(locale, 'home.featuredTitle')}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-neutral-500 text-sm"
                >
                  {t(locale, 'home.featuredSubtitle')}
                </motion.p>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-2 text-sm tracking-wide hover:gap-3 transition-all"
              >
                {t(locale, 'common.viewAll')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <ProductGrid
              products={featuredProducts}
              locale={locale}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />

            <div className="text-center mt-12 sm:hidden">
              <Link href="/shop">
                <Button variant="outline">{t(locale, 'common.viewAll')}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Editorial Banner */}
        <section className="relative h-[70vh] min-h-[500px]">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
            alt="Editorial"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl px-4"
            >
              <span className="text-white/80 text-xs tracking-[0.4em] mb-6 block">
                {t(locale, 'home.editorialLabel')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-light mb-6 leading-tight">
                {t(locale, 'home.editorialTitle')}
              </h2>
              <p className="text-white/70 mb-8">
                {t(locale, 'home.editorialDescription')}
              </p>
              <Link href="/editorial">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  {t(locale, 'common.readMore')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-20 lg:py-28">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl lg:text-3xl font-light mb-2"
                >
                  {t(locale, 'home.newArrivals')}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-neutral-500 text-sm"
                >
                  {t(locale, 'home.newArrivalsSubtitle')}
                </motion.p>
              </div>
              <Link
                href="/new"
                className="hidden sm:flex items-center gap-2 text-sm tracking-wide hover:gap-3 transition-all"
              >
                {t(locale, 'common.viewAll')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <ProductGrid
              products={newProducts}
              locale={locale}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </section>

        {/* Brand Promise */}
        <section className="py-20 lg:py-28 border-t border-neutral-100">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-center">
              {[
                { title: t(locale, 'home.promiseAuthenticTitle'), desc: t(locale, 'home.promiseAuthenticDesc') },
                { title: t(locale, 'home.promiseShippingTitle'), desc: t(locale, 'home.promiseShippingDesc') },
                { title: t(locale, 'home.promiseServiceTitle'), desc: t(locale, 'home.promiseServiceDesc') },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-sm tracking-widest mb-3">{item.title}</h3>
                  <p className="text-neutral-500 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
