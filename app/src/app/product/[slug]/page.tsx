'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, Share2, Minus, Plus, Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { cn, formatPrice } from '@/lib/utils';
import { Locale, t, getLocalizedField } from '@/lib/i18n';
import { sampleProducts } from '@/lib/data';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const product = sampleProducts.find((p) => p.slug === resolvedParams.slug);

  const [locale, setLocale] = useState<Locale>('en');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Product Not Found</h1>
          <Link href="/" className="text-sm underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const name = getLocalizedField(product, 'name', locale);
  const description = getLocalizedField(product, 'description', locale);

  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const colors = [...new Set(product.variants.map((v) => v.color))];

  const selectedVariant = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );
  const inStock = selectedVariant ? selectedVariant.stock > 0 : false;
  const stockCount = selectedVariant?.stock || 0;

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} onLocaleChange={setLocale} cartCount={0} />

      <main className="pt-4 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 mb-8">
          <nav className="flex items-center gap-2 text-xs text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-black">{name}</span>
          </nav>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-[3/4] bg-neutral-100 overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[selectedImage]?.url || product.images[0].url}
                      alt={name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-black text-white text-[10px] tracking-widest px-3 py-1.5">
                      NEW
                    </span>
                  )}
                  {product.comparePrice && (
                    <span className="bg-red-600 text-white text-[10px] tracking-widest px-3 py-1.5">
                      SALE
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        'relative w-20 h-28 bg-neutral-100 overflow-hidden transition-all',
                        selectedImage === index ? 'ring-2 ring-black' : 'opacity-60 hover:opacity-100'
                      )}
                    >
                      <Image
                        src={img.url}
                        alt={`${name} - View ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:pt-8"
            >
              <div className="sticky top-24">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1 text-xs text-neutral-500 mb-6 hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-3 h-3" />
                  Back to Shop
                </Link>

                <p className="text-xs text-neutral-500 tracking-widest mb-2">{product.brand.toUpperCase()}</p>
                <h1 className="text-2xl lg:text-3xl font-light mb-4">{name}</h1>

                <div className="flex items-center gap-3 mb-8">
                  <span className="text-xl">{formatPrice(product.price)}</span>
                  {product.comparePrice && (
                    <span className="text-lg text-neutral-400 line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>

                {/* Color Selection */}
                {colors.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-xs tracking-wider mb-3">
                      {t(locale, 'product.selectColor')}: {selectedColor || ''}
                    </label>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            'px-4 py-2 text-xs border transition-all',
                            selectedColor === color
                              ? 'border-black bg-black text-white'
                              : 'border-neutral-200 hover:border-neutral-400'
                          )}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs tracking-wider">
                        {t(locale, 'product.selectSize')}
                      </label>
                      <button className="text-xs underline text-neutral-500 hover:text-black">
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => {
                        const variant = product.variants.find(
                          (v) => v.size === size && v.color === (selectedColor || colors[0])
                        );
                        const available = variant && variant.stock > 0;
                        return (
                          <button
                            key={size}
                            onClick={() => available && setSelectedSize(size)}
                            disabled={!available}
                            className={cn(
                              'min-w-[48px] px-4 py-3 text-xs border transition-all',
                              selectedSize === size
                                ? 'border-black bg-black text-white'
                                : available
                                ? 'border-neutral-200 hover:border-neutral-400'
                                : 'border-neutral-100 text-neutral-300 cursor-not-allowed line-through'
                            )}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-8">
                  <label className="block text-xs tracking-wider mb-3">Quantity</label>
                  <div className="flex items-center border border-neutral-200 w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-neutral-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(stockCount, quantity + 1))}
                      className="p-3 hover:bg-neutral-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stock Status */}
                {selectedSize && selectedColor && (
                  <div className="mb-6">
                    {inStock ? (
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {stockCount <= 3
                          ? t(locale, 'product.lowStock').replace('{count}', String(stockCount))
                          : t(locale, 'product.inStock')}
                      </p>
                    ) : (
                      <p className="text-xs text-red-600">{t(locale, 'product.outOfStock')}</p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mb-8">
                  <Button
                    size="lg"
                    className="flex-1"
                    disabled={!selectedSize || !selectedColor || !inStock}
                  >
                    {t(locale, 'product.addToBag')}
                  </Button>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-14 h-14 border border-neutral-200 flex items-center justify-center hover:border-black transition-colors"
                  >
                    <Heart
                      className={cn(
                        'w-5 h-5',
                        isFavorite ? 'fill-red-500 text-red-500' : ''
                      )}
                    />
                  </button>
                  <button className="w-14 h-14 border border-neutral-200 flex items-center justify-center hover:border-black transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-t pt-8">
                  <div className="flex gap-8 mb-6">
                    {(['description', 'details', 'shipping'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          'text-xs tracking-wider transition-colors',
                          activeTab === tab ? 'text-black' : 'text-neutral-400 hover:text-black'
                        )}
                      >
                        {t(locale, `product.${tab}`).toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-neutral-600 leading-relaxed"
                    >
                      {activeTab === 'description' && <p>{description}</p>}
                      {activeTab === 'details' && (
                        <ul className="space-y-2">
                          <li>SKU: {product.sku}</li>
                          <li>Brand: {product.brand}</li>
                          <li>Made in Italy</li>
                          <li>Dry clean only</li>
                        </ul>
                      )}
                      {activeTab === 'shipping' && (
                        <ul className="space-y-2">
                          <li>Complimentary shipping on orders over €500</li>
                          <li>Express delivery available</li>
                          <li>30-day return policy</li>
                          <li>Authenticity guaranteed</li>
                        </ul>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
