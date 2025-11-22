'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { Button } from '@/components/ui/Button';
import { Locale, t } from '@/lib/i18n';
import { artworks, exhibitions, getLocalizedField } from '@/lib/data';

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('en');

  const featuredWorks = artworks.filter((a) => a.is_featured).slice(0, 4);
  const currentExhibition = exhibitions.find((e) => e.is_active);

  return (
    <div className="min-h-screen bg-void-black">
      <Header locale={locale} onLocaleChange={setLocale} />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col justify-center px-4 lg:px-8 relative overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: 'linear-gradient(var(--gray-700) 1px, transparent 1px), linear-gradient(90deg, var(--gray-700) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {/* Giant Text */}
            <div className="space-y-0">
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[15vw] lg:text-[12vw] font-black leading-[0.85] tracking-tighter text-void-white"
              >
                {t(locale, 'home.heroLine1')}
              </motion.h1>
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[15vw] lg:text-[12vw] font-black leading-[0.85] tracking-tighter text-void-red"
              >
                {t(locale, 'home.heroLine2')}
              </motion.h1>
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[15vw] lg:text-[12vw] font-black leading-[0.85] tracking-tighter text-void-white"
              >
                {t(locale, 'home.heroLine3')}
              </motion.h1>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-4 lg:left-8"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-gray-500 tracking-widest">
                  {t(locale, 'home.scroll')}
                </span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-4 h-8 border border-gray-700 rounded-full flex items-start justify-center p-1"
                >
                  <div className="w-1 h-2 bg-gray-600 rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Works */}
        <section className="py-24 px-4 lg:px-8 border-t-2 border-gray-800">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-xs font-mono text-gray-600 tracking-widest">01</span>
              <h2 className="text-4xl lg:text-5xl font-black text-void-white mt-2">
                {t(locale, 'home.featured')}
              </h2>
            </div>
            <Link href="/gallery">
              <Button variant="outline" className="hidden sm:flex items-center gap-2">
                {t(locale, 'home.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Broken Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredWorks.map((work, index) => (
              <div
                key={work.id}
                className={index % 3 === 1 ? 'lg:mt-12' : index % 3 === 2 ? 'lg:-mt-8' : ''}
              >
                <ArtworkCard artwork={work} locale={locale} index={index} />
              </div>
            ))}
          </div>

          <div className="mt-12 sm:hidden">
            <Link href="/gallery">
              <Button variant="outline" className="w-full">
                {t(locale, 'home.viewAll')}
              </Button>
            </Link>
          </div>
        </section>

        {/* Current Exhibition */}
        {currentExhibition && (
          <section className="py-24 px-4 lg:px-8 border-t-2 border-gray-800">
            <div className="mb-8">
              <span className="text-xs font-mono text-gray-600 tracking-widest">02</span>
              <h2 className="text-4xl lg:text-5xl font-black text-void-white mt-2">
                {t(locale, 'home.currentExhibition')}
              </h2>
            </div>

            <Link href={`/exhibitions/${currentExhibition.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Cover Image */}
                <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden border-2 border-gray-800 group-hover:border-void-red transition-colors">
                  <Image
                    src={currentExhibition.cover_image}
                    alt={getLocalizedField(currentExhibition, 'title', locale)}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Info */}
                <div className="space-y-6">
                  <div className="inline-block bg-void-red px-3 py-1 text-xs font-mono text-void-white">
                    {t(locale, 'exhibition.current')}
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-black text-void-white group-hover:text-void-red transition-colors">
                    &quot;{getLocalizedField(currentExhibition, 'title', locale)}&quot;
                  </h3>

                  <div className="space-y-2 text-sm font-mono">
                    <div className="data-row">
                      <span className="data-row__key">{t(locale, 'exhibition.curator')}</span>
                      <span className="data-row__value">{currentExhibition.curator}</span>
                    </div>
                    <div className="data-row">
                      <span className="data-row__key">{t(locale, 'exhibition.dates')}</span>
                      <span className="data-row__value">
                        {currentExhibition.start_date} — {currentExhibition.end_date}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed">
                    {getLocalizedField(currentExhibition, 'description', locale)}
                  </p>

                  <Button variant="outline" className="flex items-center gap-2">
                    {t(locale, 'exhibition.viewWorks')}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* About Teaser */}
        <section className="py-24 px-4 lg:px-8 border-t-2 border-gray-800 bg-gray-900">
          <div className="max-w-4xl">
            <span className="text-xs font-mono text-gray-600 tracking-widest">03</span>
            <h2 className="text-4xl lg:text-6xl font-black text-void-white mt-4 leading-tight">
              WE EXIST AT THE INTERSECTION OF{' '}
              <span className="text-void-red">CODE</span> AND{' '}
              <span className="text-void-red">CHAOS</span>
            </h2>
            <p className="text-gray-400 mt-8 text-lg leading-relaxed max-w-2xl">
              {t(locale, 'about.missionText')}
            </p>
            <Link href="/about" className="mt-8 inline-block">
              <Button variant="ghost" className="flex items-center gap-2">
                LEARN MORE
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
