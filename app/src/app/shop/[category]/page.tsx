'use client';

import { useState, useMemo, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Locale } from '@/lib/i18n';
import { sampleProducts, sampleCategories, getLocalizedField } from '@/lib/data';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const category = sampleCategories.find((c) => c.slug === resolvedParams.category);

  const [locale, setLocale] = useState<Locale>('en');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');

  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return sampleProducts.filter((p) => p.categoryId === category.id);
  }, [category]);

  const brands = useMemo(() => {
    return [...new Set(categoryProducts.map((p) => p.brand))];
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    let products = [...categoryProducts];

    if (selectedBrand) {
      products = products.filter((p) => p.brand === selectedBrand);
    }

    switch (sortBy) {
      case 'newest':
        products = products.filter((p) => p.isNew).concat(products.filter((p) => !p.isNew));
        break;
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      default:
        products = products.filter((p) => p.isFeatured).concat(products.filter((p) => !p.isFeatured));
    }

    return products;
  }, [categoryProducts, selectedBrand, sortBy]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Category Not Found</h1>
          <Link href="/shop" className="text-sm underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = getLocalizedField(category, 'name', locale);
  const categoryDescription = getLocalizedField(category, 'description', locale);

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} onLocaleChange={setLocale} cartCount={0} />

      <main className="py-12">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-black">{categoryName}</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-light mb-4"
            >
              {categoryName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-neutral-500 mb-2"
            >
              {categoryDescription}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-neutral-400"
            >
              {filteredProducts.length} items
            </motion.p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b">
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-500">Filter by:</span>
              <div className="flex gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      selectedBrand === brand
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
              {selectedBrand && (
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-xs underline text-neutral-500 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent text-sm pr-6 cursor-pointer focus:outline-none"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products */}
          <ProductGrid
            products={filteredProducts}
            locale={locale}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
