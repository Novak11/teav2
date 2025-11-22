'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { Locale, t } from '@/lib/i18n';
import { artworks } from '@/lib/data';
import { cn } from '@/lib/utils';

const categories = ['all', 'digital', 'generative', 'photography', 'mixed-media'] as const;

export default function GalleryPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArtworks = useMemo(() => {
    if (selectedCategory === 'all') return artworks;
    return artworks.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-void-black">
      <Header locale={locale} onLocaleChange={setLocale} />

      <main className="pt-24 pb-24">
        {/* Page Header */}
        <section className="px-4 lg:px-8 py-16 border-b-2 border-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-mono text-gray-600 tracking-widest">
              {filteredArtworks.length} WORKS
            </span>
            <h1 className="text-6xl lg:text-8xl font-black text-void-white mt-2">
              {t(locale, 'nav.gallery')}
            </h1>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="px-4 lg:px-8 py-8 border-b-2 border-gray-800">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-4 py-2 text-xs font-mono uppercase border-2 transition-all',
                  selectedCategory === cat
                    ? 'bg-void-white text-void-black border-void-white'
                    : 'bg-transparent text-gray-500 border-gray-700 hover:border-void-white hover:text-void-white'
                )}
              >
                {t(locale, `filter.${cat === 'mixed-media' ? 'mixedMedia' : cat}`)}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArtworks.map((work, index) => (
              <ArtworkCard
                key={work.id}
                artwork={work}
                locale={locale}
                index={index}
              />
            ))}
          </div>

          {filteredArtworks.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-500 font-mono">NO WORKS FOUND</p>
            </div>
          )}
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
