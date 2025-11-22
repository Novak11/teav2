'use client';

import { ProductCard } from './ProductCard';
import { Locale } from '@/lib/i18n';
import { SampleProduct } from '@/lib/data';

interface ProductGridProps {
  products: SampleProduct[];
  locale: Locale;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  columns?: 2 | 3 | 4;
}

export function ProductGrid({
  products,
  locale,
  favorites = [],
  onToggleFavorite,
  columns = 4,
}: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-neutral-400 text-sm tracking-wide">No products found</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-12`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
