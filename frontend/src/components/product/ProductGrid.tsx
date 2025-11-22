'use client';

import { Product } from '@/types';
import ProductCard from './ProductCard';
import { Language } from '@/lib/translations';

interface ProductGridProps {
  products: Product[];
  lang: Language;
  favorites?: string[];
  onToggleFavorite?: (productId: string) => void;
}

export default function ProductGrid({ products, lang, favorites = [], onToggleFavorite }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          lang={lang}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
