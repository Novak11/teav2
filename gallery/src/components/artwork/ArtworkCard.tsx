'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Artwork, getArtist, getLocalizedField } from '@/lib/data';
import { Locale } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';

interface ArtworkCardProps {
  artwork: Artwork;
  locale: Locale;
  index?: number;
}

export function ArtworkCard({ artwork, locale, index = 0 }: ArtworkCardProps) {
  const artist = getArtist(artwork.artist_id);
  const title = getLocalizedField(artwork, 'title', locale);
  const primaryImage = artwork.images.find((i) => i.is_primary) || artwork.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/work/${artwork.slug}`} className="group block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden border-2 border-transparent group-hover:border-void-red transition-colors">
          <Image
            src={primaryImage.url}
            alt={title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />

          {/* Sold Badge */}
          {artwork.is_sold && (
            <div className="absolute top-4 right-4 bg-void-red text-void-white px-3 py-1 text-xs font-mono">
              SOLD
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1">
          <p className="text-xs font-mono text-gray-500 tracking-wider">
            {artist?.name}
          </p>
          <h3 className="text-lg font-black text-void-white group-hover:text-void-red transition-colors">
            &quot;{title}&quot;
          </h3>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
            <span>{artwork.year}</span>
            <span>/</span>
            <span className="uppercase">{artwork.category.replace('-', ' ')}</span>
          </div>
          <p className="text-sm font-mono text-void-white">
            {artwork.is_sold ? '—' : formatPrice(artwork.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
