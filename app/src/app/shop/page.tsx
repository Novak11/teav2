'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
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

const brands = [...new Set(sampleProducts.map((p) => p.brand))];

export default function ShopPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredProducts = useMemo(() => {
    let products = [...sampleProducts];

    if (selectedCategory) {
      products = products.filter((p) => p.categoryId === selectedCategory);
    }

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
  }, [selectedCategory, selectedBrand, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  const hasActiveFilters = selectedCategory || selectedBrand;

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} onLocaleChange={setLocale} cartCount={0} />

      <main className="py-12">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-light mb-4"
            >
              All Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-neutral-500"
            >
              {filteredProducts.length} items
            </motion.p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-sm tracking-wide hover:text-neutral-500 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                  {(selectedCategory ? 1 : 0) + (selectedBrand ? 1 : 0)}
                </span>
              )}
            </button>

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

          {/* Filters Panel */}
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 pb-8 border-b"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Category Filter */}
                <div>
                  <h3 className="text-xs tracking-widest mb-4">CATEGORY</h3>
                  <div className="space-y-2">
                    {sampleCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                        className={`block text-sm transition-colors ${
                          selectedCategory === cat.id ? 'text-black font-medium' : 'text-neutral-500 hover:text-black'
                        }`}
                      >
                        {getLocalizedField(cat, 'name', locale)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h3 className="text-xs tracking-widest mb-4">BRAND</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                        className={`block text-sm transition-colors ${
                          selectedBrand === brand ? 'text-black font-medium' : 'text-neutral-500 hover:text-black'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-6 text-xs underline text-neutral-500 hover:text-black"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-neutral-100 text-xs hover:bg-neutral-200 transition-colors"
                >
                  {getLocalizedField(sampleCategories.find((c) => c.id === selectedCategory)!, 'name', locale)}
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedBrand && (
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-neutral-100 text-xs hover:bg-neutral-200 transition-colors"
                >
                  {selectedBrand}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

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
