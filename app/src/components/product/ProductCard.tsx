'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { Locale, getLocalizedField } from '@/lib/i18n';
import { SampleProduct } from '@/lib/data';

interface ProductCardProps {
  product: SampleProduct;
  locale: Locale;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  priority?: boolean;
}

export function ProductCard({
  product,
  locale,
  isFavorite = false,
  onToggleFavorite,
  priority = false,
}: ProductCardProps) {
  const name = getLocalizedField(product, 'name', locale);
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const secondaryImage = product.images.find((img) => !img.isPrimary);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={name}
              fill
              priority={priority}
              className={cn(
                'object-cover transition-opacity duration-700',
                secondaryImage && 'group-hover:opacity-0'
              )}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
          {secondaryImage && (
            <Image
              src={secondaryImage.url}
              alt={`${name} - alternate view`}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-black text-white text-[10px] tracking-widest px-2.5 py-1">
                NEW
              </span>
            )}
            {product.comparePrice && (
              <span className="bg-red-600 text-white text-[10px] tracking-widest px-2.5 py-1">
                SALE
              </span>
            )}
          </div>

          {/* Favorite Button */}
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite(product.id);
              }}
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart
                className={cn(
                  'w-4 h-4 transition-colors',
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-600'
                )}
              />
            </button>
          )}

          {/* Quick Add */}
          <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                // Quick add logic
              }}
              className="w-full bg-white/95 backdrop-blur text-black text-xs tracking-wider py-3 hover:bg-black hover:text-white transition-colors"
            >
              QUICK ADD
            </button>
          </div>
        </div>
      </Link>

      <div className="space-y-1">
        <p className="text-[11px] text-neutral-500 tracking-wider">{product.brand.toUpperCase()}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-light leading-snug hover:text-neutral-500 transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-sm text-neutral-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
