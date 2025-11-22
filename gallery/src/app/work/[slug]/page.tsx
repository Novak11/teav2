'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Locale, t } from '@/lib/i18n';
import { getArtworkBySlug, getArtist, getLocalizedField } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export default function WorkPage({ params }: WorkPageProps) {
  const resolvedParams = use(params);
  const artwork = getArtworkBySlug(resolvedParams.slug);
  const [locale, setLocale] = useState<Locale>('en');

  if (!artwork) {
    return (
      <div className="min-h-screen bg-void-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-void-white mb-4">404</h1>
          <p className="text-gray-500 font-mono mb-8">WORK NOT FOUND</p>
          <Link href="/gallery">
            <Button variant="outline">BACK TO GALLERY</Button>
          </Link>
        </div>
      </div>
    );
  }

  const artist = getArtist(artwork.artist_id);
  const title = getLocalizedField(artwork, 'title', locale);
  const description = getLocalizedField(artwork, 'description', locale);
  const primaryImage = artwork.images.find((i) => i.is_primary) || artwork.images[0];

  return (
    <div className="min-h-screen bg-void-black">
      <Header locale={locale} onLocaleChange={setLocale} />

      <main className="pt-24 pb-24">
        {/* Back Link */}
        <div className="px-4 lg:px-8 py-6 border-b-2 border-gray-800">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-void-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t(locale, 'artwork.backToGallery')}
          </Link>
        </div>

        <div className="px-4 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-[3/4] bg-gray-900 border-2 border-gray-800"
            >
              <Image
                src={primaryImage.url}
                alt={title}
                fill
                priority
                className="object-cover"
              />
              {artwork.is_sold && (
                <div className="absolute top-4 right-4 bg-void-red px-4 py-2 text-sm font-mono text-void-white">
                  {t(locale, 'artwork.sold')}
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Artist */}
              {artist && (
                <Link
                  href={`/artists/${artist.slug}`}
                  className="text-sm font-mono text-gray-500 hover:text-void-red transition-colors"
                >
                  {artist.name}
                </Link>
              )}

              {/* Title */}
              <div className="border-y-2 border-gray-800 py-6">
                <h1 className="text-4xl lg:text-5xl font-black text-void-white">
                  &quot;{title}&quot;
                </h1>
              </div>

              {/* Data Rows */}
              <div className="space-y-0">
                <div className="data-row">
                  <span className="data-row__key">{t(locale, 'artwork.year')}</span>
                  <span className="data-row__value">{artwork.year}</span>
                </div>
                <div className="data-row">
                  <span className="data-row__key">{t(locale, 'artwork.medium')}</span>
                  <span className="data-row__value">{artwork.medium}</span>
                </div>
                <div className="data-row">
                  <span className="data-row__key">{t(locale, 'artwork.dimensions')}</span>
                  <span className="data-row__value">{artwork.dimensions}</span>
                </div>
                <div className="data-row">
                  <span className="data-row__key">{t(locale, 'artwork.edition')}</span>
                  <span className="data-row__value">
                    {artwork.edition_size ? `1/${artwork.edition_size}` : t(locale, 'artwork.unique')}
                  </span>
                </div>
                <div className="data-row">
                  <span className="data-row__key">{t(locale, 'artwork.price')}</span>
                  <span className="data-row__value text-lg">
                    {artwork.is_sold ? '—' : formatPrice(artwork.price)}
                  </span>
                </div>
              </div>

              {/* CTA */}
              {!artwork.is_sold && (
                <Button size="lg" className="w-full">
                  {t(locale, 'artwork.inquire')}
                </Button>
              )}

              {/* Description */}
              <div className="pt-8 border-t border-gray-800">
                <p className="text-gray-400 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
