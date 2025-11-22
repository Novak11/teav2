'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Language, getTranslation, getCategoryName } from '@/lib/translations';
import { Product, Category } from '@/types';

// Sample product data for demonstration
const sampleProducts: Product[] = [
  {
    id: '1',
    sku: 'GUC-DRS-001',
    nameEn: 'Silk Evening Dress',
    nameDe: 'Seiden-Abendkleid',
    nameSr: 'Svilena Vecernja Haljina',
    descriptionEn: 'Elegant silk evening dress with intricate embroidery.',
    descriptionDe: 'Elegantes Seiden-Abendkleid mit aufwendiger Stickerei.',
    descriptionSr: 'Elegantna svilena vecernja haljina sa preciznim vezom.',
    brand: 'Gucci',
    basePrice: 2450,
    currency: 'EUR',
    isFeatured: true,
    isActive: true,
    images: [{ id: '1', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', altTextEn: 'Silk Dress', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: [],
    categories: []
  },
  {
    id: '2',
    sku: 'PRA-BAG-001',
    nameEn: 'Saffiano Leather Tote',
    nameDe: 'Saffiano Leder-Tasche',
    nameSr: 'Saffiano Kozna Torba',
    descriptionEn: 'Iconic Saffiano leather tote bag with gold-tone hardware.',
    descriptionDe: 'Ikonische Saffiano-Leder-Tasche mit goldfarbenen Beschlagen.',
    descriptionSr: 'Ikonicna Saffiano kozna torba sa zlatnim detaljima.',
    brand: 'Prada',
    basePrice: 1890,
    currency: 'EUR',
    isFeatured: true,
    isActive: true,
    images: [{ id: '2', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800', altTextEn: 'Leather Tote', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: [],
    categories: []
  },
  {
    id: '3',
    sku: 'LV-SHO-001',
    nameEn: 'Archlight Sneakers',
    nameDe: 'Archlight Sneaker',
    nameSr: 'Archlight Patike',
    descriptionEn: 'Futuristic Archlight sneakers with signature wave-shaped sole.',
    descriptionDe: 'Futuristische Archlight-Sneaker.',
    descriptionSr: 'Futuristicke Archlight patike.',
    brand: 'Louis Vuitton',
    basePrice: 1250,
    currency: 'EUR',
    isFeatured: true,
    isActive: true,
    images: [{ id: '3', imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800', altTextEn: 'Sneakers', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: [],
    categories: []
  },
  {
    id: '4',
    sku: 'CAR-JWL-001',
    nameEn: 'Love Bracelet',
    nameDe: 'Love Armband',
    nameSr: 'Love Narukvica',
    descriptionEn: '18K yellow gold Love bracelet with iconic screw motif.',
    descriptionDe: '18K Gelbgold Love Armband.',
    descriptionSr: '18K zuto zlato Love narukvica.',
    brand: 'Cartier',
    basePrice: 6850,
    currency: 'EUR',
    isFeatured: true,
    isActive: true,
    images: [{ id: '4', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', altTextEn: 'Bracelet', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: [],
    categories: []
  },
  {
    id: '5',
    sku: 'DIO-DRS-001',
    nameEn: 'Tailored Wool Coat',
    nameDe: 'Massgeschneiderter Wollmantel',
    nameSr: 'Krojen Vuneni Kaput',
    descriptionEn: 'Classic tailored wool coat with silk lining.',
    descriptionDe: 'Klassischer massgeschneiderter Wollmantel.',
    descriptionSr: 'Klasican krojen vuneni kaput.',
    brand: 'Dior',
    basePrice: 3200,
    currency: 'EUR',
    isFeatured: true,
    isActive: true,
    images: [{ id: '5', imageUrl: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800', altTextEn: 'Wool Coat', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: [],
    categories: []
  },
  {
    id: '6',
    sku: 'HER-BAG-001',
    nameEn: 'Birkin 25',
    nameDe: 'Birkin 25',
    nameSr: 'Birkin 25',
    descriptionEn: 'Iconic Birkin bag in Togo leather with palladium hardware.',
    descriptionDe: 'Ikonische Birkin-Tasche aus Togo-Leder.',
    descriptionSr: 'Ikonicna Birkin torba od Togo koze.',
    brand: 'Hermes',
    basePrice: 12500,
    currency: 'EUR',
    isFeatured: true,
    isActive: true,
    images: [{ id: '6', imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', altTextEn: 'Birkin Bag', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: [],
    categories: []
  },
  {
    id: '7',
    sku: 'CHL-SHO-001',
    nameEn: 'Ankle Boots',
    nameDe: 'Stiefeletten',
    nameSr: 'Gleznjace',
    descriptionEn: 'Sophisticated ankle boots in smooth calfskin leather.',
    descriptionDe: 'Raffinierte Stiefeletten aus glattem Kalbsleder.',
    descriptionSr: 'Sofisticirane gleznjace od glatke telecje koze.',
    brand: 'Chloe',
    basePrice: 980,
    currency: 'EUR',
    isFeatured: false,
    isActive: true,
    images: [{ id: '7', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800', altTextEn: 'Boots', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: [],
    categories: []
  },
  {
    id: '8',
    sku: 'BVL-JWL-001',
    nameEn: 'Serpenti Necklace',
    nameDe: 'Serpenti Halskette',
    nameSr: 'Serpenti Ogrlica',
    descriptionEn: 'Stunning Serpenti necklace in 18K white gold with pave diamonds.',
    descriptionDe: 'Atemberaubende Serpenti-Halskette aus 18K Weissgold.',
    descriptionSr: 'Zapanjujuca Serpenti ogrlica od 18K belog zlata.',
    brand: 'Bulgari',
    basePrice: 18500,
    currency: 'EUR',
    isFeatured: false,
    isActive: true,
    images: [{ id: '8', imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', altTextEn: 'Necklace', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: [],
    categories: []
  }
];

const sampleCategories: Category[] = [
  {
    id: '1',
    nameEn: 'Clothing',
    nameDe: 'Kleidung',
    nameSr: 'Odeca',
    slug: 'clothing',
    descriptionEn: 'Luxury designer clothing',
    descriptionDe: 'Luxus Designer-Kleidung',
    descriptionSr: 'Luksuzna dizajnerska odeca',
    imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800'
  },
  {
    id: '2',
    nameEn: 'Footwear',
    nameDe: 'Schuhe',
    nameSr: 'Obuca',
    slug: 'footwear',
    descriptionEn: 'Premium designer footwear',
    descriptionDe: 'Premium Designer-Schuhe',
    descriptionSr: 'Premium dizajnerska obuca',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800'
  },
  {
    id: '3',
    nameEn: 'Jewelry',
    nameDe: 'Schmuck',
    nameSr: 'Nakit',
    slug: 'jewelry',
    descriptionEn: 'Exquisite fine jewelry',
    descriptionDe: 'Exquisiter Schmuck',
    descriptionSr: 'Izuzetan fini nakit',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'
  },
  {
    id: '4',
    nameEn: 'Bags',
    nameDe: 'Taschen',
    nameSr: 'Torbe',
    slug: 'bags',
    descriptionEn: 'Luxury designer bags',
    descriptionDe: 'Luxus Designer-Taschen',
    descriptionSr: 'Luksuzne dizajnerske torbe',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800'
  }
];

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [favorites, setFavorites] = useState<string[]>([]);
  const t = (key: string) => getTranslation(lang, key);

  const featuredProducts = sampleProducts.filter(p => p.isFeatured);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920"
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-serif mb-6">{t('home.hero')}</h1>
            <p className="text-xl md:text-2xl mb-8 font-light">{t('home.heroSubtitle')}</p>
            <Link
              href="/shop/clothing"
              className="inline-block bg-white text-black px-8 py-4 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              {t('nav.shop')}
            </Link>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-12">{t('home.categories')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sampleCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop/${category.slug}`}
                  className="group relative aspect-square overflow-hidden"
                >
                  <Image
                    src={category.imageUrl || ''}
                    alt={getCategoryName(category, lang)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl font-medium">{getCategoryName(category, lang)}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif text-center mb-12">{t('home.featured')}</h2>
            <ProductGrid
              products={featuredProducts}
              lang={lang}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </section>

        {/* New Arrivals Banner */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920"
              alt="New Arrivals"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">{t('home.newArrivals')}</h2>
            <Link
              href="/shop/clothing"
              className="inline-block border-2 border-white text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-black transition-colors"
            >
              {t('nav.shop')}
            </Link>
          </div>
        </section>

        {/* All Products */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ProductGrid
              products={sampleProducts}
              lang={lang}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
