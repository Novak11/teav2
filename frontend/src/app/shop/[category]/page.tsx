'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Language, getTranslation, getCategoryName } from '@/lib/translations';
import { Product, Category } from '@/types';

// Sample products
const allProducts: Product[] = [
  {
    id: '1', sku: 'GUC-DRS-001', nameEn: 'Silk Evening Dress', nameDe: 'Seiden-Abendkleid', nameSr: 'Svilena Vecernja Haljina',
    descriptionEn: 'Elegant silk evening dress.', descriptionDe: 'Elegantes Seiden-Abendkleid.', descriptionSr: 'Elegantna svilena haljina.',
    brand: 'Gucci', basePrice: 2450, currency: 'EUR', isFeatured: true, isActive: true, categories: [],
    images: [{ id: '1', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', altTextEn: 'Dress', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: []
  },
  {
    id: '5', sku: 'DIO-DRS-001', nameEn: 'Tailored Wool Coat', nameDe: 'Wollmantel', nameSr: 'Vuneni Kaput',
    descriptionEn: 'Classic wool coat.', descriptionDe: 'Klassischer Wollmantel.', descriptionSr: 'Klasican vuneni kaput.',
    brand: 'Dior', basePrice: 3200, currency: 'EUR', isFeatured: true, isActive: true, categories: [],
    images: [{ id: '5', imageUrl: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800', altTextEn: 'Coat', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: []
  },
  {
    id: '3', sku: 'LV-SHO-001', nameEn: 'Archlight Sneakers', nameDe: 'Archlight Sneaker', nameSr: 'Archlight Patike',
    descriptionEn: 'Futuristic sneakers.', descriptionDe: 'Futuristische Sneaker.', descriptionSr: 'Futuristicke patike.',
    brand: 'Louis Vuitton', basePrice: 1250, currency: 'EUR', isFeatured: true, isActive: true, categories: [],
    images: [{ id: '3', imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800', altTextEn: 'Sneakers', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: []
  },
  {
    id: '7', sku: 'CHL-SHO-001', nameEn: 'Ankle Boots', nameDe: 'Stiefeletten', nameSr: 'Gleznjace',
    descriptionEn: 'Elegant ankle boots.', descriptionDe: 'Elegante Stiefeletten.', descriptionSr: 'Elegantne gleznjace.',
    brand: 'Chloe', basePrice: 980, currency: 'EUR', isFeatured: false, isActive: true, categories: [],
    images: [{ id: '7', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800', altTextEn: 'Boots', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: []
  },
  {
    id: '4', sku: 'CAR-JWL-001', nameEn: 'Love Bracelet', nameDe: 'Love Armband', nameSr: 'Love Narukvica',
    descriptionEn: '18K gold bracelet.', descriptionDe: '18K Gold Armband.', descriptionSr: '18K zlatna narukvica.',
    brand: 'Cartier', basePrice: 6850, currency: 'EUR', isFeatured: true, isActive: true, categories: [],
    images: [{ id: '4', imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', altTextEn: 'Bracelet', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: []
  },
  {
    id: '8', sku: 'BVL-JWL-001', nameEn: 'Serpenti Necklace', nameDe: 'Serpenti Halskette', nameSr: 'Serpenti Ogrlica',
    descriptionEn: 'Diamond necklace.', descriptionDe: 'Diamant Halskette.', descriptionSr: 'Dijamantska ogrlica.',
    brand: 'Bulgari', basePrice: 18500, currency: 'EUR', isFeatured: false, isActive: true, categories: [],
    images: [{ id: '8', imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', altTextEn: 'Necklace', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: []
  },
  {
    id: '2', sku: 'PRA-BAG-001', nameEn: 'Saffiano Leather Tote', nameDe: 'Saffiano Tasche', nameSr: 'Saffiano Torba',
    descriptionEn: 'Leather tote bag.', descriptionDe: 'Leder-Tasche.', descriptionSr: 'Kozna torba.',
    brand: 'Prada', basePrice: 1890, currency: 'EUR', isFeatured: true, isActive: true, categories: [],
    images: [{ id: '2', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800', altTextEn: 'Bag', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: []
  },
  {
    id: '6', sku: 'HER-BAG-001', nameEn: 'Birkin 25', nameDe: 'Birkin 25', nameSr: 'Birkin 25',
    descriptionEn: 'Iconic Birkin bag.', descriptionDe: 'Ikonische Birkin-Tasche.', descriptionSr: 'Ikonicna Birkin torba.',
    brand: 'Hermes', basePrice: 12500, currency: 'EUR', isFeatured: true, isActive: true, categories: [],
    images: [{ id: '6', imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', altTextEn: 'Birkin', altTextDe: null, altTextSr: null, displayOrder: 0, isPrimary: true }],
    variants: []
  }
];

const categoryMap: Record<string, string[]> = {
  clothing: ['1', '5'],
  footwear: ['3', '7'],
  jewelry: ['4', '8'],
  bags: ['2', '6']
};

const categoryNames: Record<string, Category> = {
  clothing: { id: '1', nameEn: 'Clothing', nameDe: 'Kleidung', nameSr: 'Odeca', slug: 'clothing', descriptionEn: null, descriptionDe: null, descriptionSr: null, imageUrl: null },
  footwear: { id: '2', nameEn: 'Footwear', nameDe: 'Schuhe', nameSr: 'Obuca', slug: 'footwear', descriptionEn: null, descriptionDe: null, descriptionSr: null, imageUrl: null },
  jewelry: { id: '3', nameEn: 'Jewelry', nameDe: 'Schmuck', nameSr: 'Nakit', slug: 'jewelry', descriptionEn: null, descriptionDe: null, descriptionSr: null, imageUrl: null },
  bags: { id: '4', nameEn: 'Bags', nameDe: 'Taschen', nameSr: 'Torbe', slug: 'bags', descriptionEn: null, descriptionDe: null, descriptionSr: null, imageUrl: null }
};

export default function ShopCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [lang, setLang] = useState<Language>('en');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const categoryInfo = categoryNames[category];
  const productIds = categoryMap[category] || [];
  let products = allProducts.filter(p => productIds.includes(p.id));

  // Sort products
  if (sortBy === 'price_asc') {
    products = [...products].sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortBy === 'price_desc') {
    products = [...products].sort((a, b) => b.basePrice - a.basePrice);
  }

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
        {/* Category Header */}
        <div className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-serif text-center">
              {categoryInfo ? getCategoryName(categoryInfo, lang) : category}
            </h1>
          </div>
        </div>

        {/* Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">{products.length} products</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          <ProductGrid
            products={products}
            lang={lang}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
