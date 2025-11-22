'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '@/types';
import { getProductName, Language } from '@/lib/translations';

interface ProductCardProps {
  product: Product;
  lang: Language;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

export default function ProductCard({ product, lang, isFavorite = false, onToggleFavorite }: ProductCardProps) {
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const name = getProductName(product, lang);

  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[2/3] relative overflow-hidden bg-gray-100">
          {primaryImage ? (
            <Image
              src={primaryImage.imageUrl}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {product.isFeatured && (
            <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">
              Featured
            </span>
          )}
        </div>
      </Link>

      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
        >
          {isFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      )}

      <div className="mt-4 space-y-1">
        <p className="text-xs text-gray-500 uppercase tracking-wider">{product.brand}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm font-medium text-gray-900">
          €{product.basePrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
