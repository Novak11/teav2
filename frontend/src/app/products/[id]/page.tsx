'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Language, getTranslation, getProductName, getProductDescription } from '@/lib/translations';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '@/types';

const sampleProducts: Record<string, Product> = {
  '1': {
    id: '1', sku: 'GUC-DRS-001', nameEn: 'Silk Evening Dress', nameDe: 'Seiden-Abendkleid', nameSr: 'Svilena Vecernja Haljina',
    descriptionEn: 'Elegant silk evening dress with intricate embroidery. Perfect for special occasions. Features a flattering A-line silhouette and delicate hand-sewn details.',
    descriptionDe: 'Elegantes Seiden-Abendkleid mit aufwendiger Stickerei. Perfekt fur besondere Anlasse.',
    descriptionSr: 'Elegantna svilena vecernja haljina sa preciznim vezom. Savrsena za posebne prilike.',
    brand: 'Gucci', basePrice: 2450, currency: 'EUR', isFeatured: true, isActive: true,
    images: [
      { id: '1a', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', altTextEn: 'Dress Front', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true },
      { id: '1b', imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', altTextEn: 'Dress Back', altTextDe: null, altTextSr: null, displayOrder: 1, isPrimary: false }
    ],
    variants: [
      { id: 'v1', size: 'XS', color: 'Black', skuVariant: 'GUC-DRS-001-XS-BK', stockQuantity: 5, priceAdjustment: 0 },
      { id: 'v2', size: 'S', color: 'Black', skuVariant: 'GUC-DRS-001-S-BK', stockQuantity: 8, priceAdjustment: 0 },
      { id: 'v3', size: 'M', color: 'Black', skuVariant: 'GUC-DRS-001-M-BK', stockQuantity: 10, priceAdjustment: 0 },
      { id: 'v4', size: 'L', color: 'Black', skuVariant: 'GUC-DRS-001-L-BK', stockQuantity: 6, priceAdjustment: 0 },
      { id: 'v5', size: 'S', color: 'Navy', skuVariant: 'GUC-DRS-001-S-NV', stockQuantity: 4, priceAdjustment: 0 },
      { id: 'v6', size: 'M', color: 'Navy', skuVariant: 'GUC-DRS-001-M-NV', stockQuantity: 7, priceAdjustment: 0 }
    ],
    categories: []
  },
  '2': {
    id: '2', sku: 'PRA-BAG-001', nameEn: 'Saffiano Leather Tote', nameDe: 'Saffiano Leder-Tasche', nameSr: 'Saffiano Kozna Torba',
    descriptionEn: 'Iconic Saffiano leather tote bag with gold-tone hardware. Spacious interior with multiple pockets.',
    descriptionDe: 'Ikonische Saffiano-Leder-Tasche mit goldfarbenen Beschlagen.',
    descriptionSr: 'Ikonicna Saffiano kozna torba sa zlatnim detaljima.',
    brand: 'Prada', basePrice: 1890, currency: 'EUR', isFeatured: true, isActive: true,
    images: [
      { id: '2a', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800', altTextEn: 'Bag', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }
    ],
    variants: [
      { id: 'v7', size: 'One Size', color: 'Black', skuVariant: 'PRA-BAG-001-OS-BK', stockQuantity: 12, priceAdjustment: 0 },
      { id: 'v8', size: 'One Size', color: 'Beige', skuVariant: 'PRA-BAG-001-OS-BG', stockQuantity: 8, priceAdjustment: 0 }
    ],
    categories: []
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [lang, setLang] = useState<Language>('en');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const t = (key: string) => getTranslation(lang, key);

  const product = sampleProducts[productId] || sampleProducts['1'];
  const name = getProductName(product, lang);
  const description = getProductDescription(product, lang);

  const sizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))] as string[];
  const colors = [...new Set(product.variants.map(v => v.color).filter(Boolean))] as string[];

  const selectedVariant = product.variants.find(
    v => v.size === selectedSize && v.color === selectedColor
  );

  const isInStock = selectedVariant ? selectedVariant.stockQuantity > 0 : true;

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-black">Home</Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link href="/shop/clothing" className="text-gray-500 hover:text-black">Shop</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span>{name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[3/4] relative bg-gray-100">
                <Image
                  src={product.images[selectedImage]?.imageUrl || ''}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-24 relative ${idx === selectedImage ? 'ring-2 ring-black' : ''}`}
                    >
                      <Image
                        src={img.imageUrl}
                        alt={`${name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{product.brand}</p>
              <h1 className="text-3xl font-serif mt-2">{name}</h1>
              <p className="text-2xl mt-4">€{product.basePrice.toLocaleString()}</p>

              <div className="mt-8 space-y-6">
                {/* Color Selector */}
                {colors.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('product.color')}</label>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border ${selectedColor === color ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('product.size')}</label>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 border ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                <p className={isInStock ? 'text-green-600' : 'text-red-600'}>
                  {isInStock ? t('product.inStock') : t('product.outOfStock')}
                </p>

                {/* Actions */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-black text-white py-4 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {t('buttons.addToCart')}
                  </button>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-4 border border-gray-300 hover:border-black transition-colors"
                  >
                    {isFavorite ? (
                      <HeartSolidIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mt-12 border-t pt-8">
                <h2 className="font-medium mb-4">{t('product.description')}</h2>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              {/* Details */}
              <div className="mt-8 border-t pt-8">
                <h2 className="font-medium mb-4">{t('product.details')}</h2>
                <ul className="text-gray-600 space-y-2">
                  <li>SKU: {product.sku}</li>
                  <li>Brand: {product.brand}</li>
                  <li>Material: Premium quality</li>
                  <li>Care: Professional cleaning recommended</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
