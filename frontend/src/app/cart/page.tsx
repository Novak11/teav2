'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Language, getTranslation } from '@/lib/translations';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface CartItemType {
  id: string;
  name: string;
  brand: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

const sampleCartItems: CartItemType[] = [
  {
    id: '1',
    name: 'Silk Evening Dress',
    brand: 'Gucci',
    size: 'M',
    color: 'Black',
    price: 2450,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'
  },
  {
    id: '2',
    name: 'Love Bracelet',
    brand: 'Cartier',
    size: '17',
    color: 'Yellow Gold',
    price: 6850,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'
  }
];

export default function CartPage() {
  const [lang, setLang] = useState<Language>('en');
  const [cartItems, setCartItems] = useState<CartItemType[]>(sampleCartItems);
  const t = (key: string) => getTranslation(lang, key);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 15;
  const tax = subtotal * 0.2;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif mb-8">{t('cart.title')}</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-8">{t('cart.empty')}</p>
              <Link
                href="/"
                className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
              >
                {t('buttons.continueShopping')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 border-b pb-6">
                    <div className="w-32 h-40 relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-gray-500 uppercase">{item.brand}</p>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {t('product.size')}: {item.size} | {t('product.color')}: {item.color}
                          </p>
                        </div>
                        <p className="font-medium">€{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 h-fit">
                <h2 className="text-lg font-medium mb-6">Order Summary</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}</span>
                    <span>€{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.shipping')}</span>
                    <span>{shipping === 0 ? 'Free' : `€${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.tax')} (20%)</span>
                    <span>€{tax.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-medium text-lg">
                    <span>{t('cart.total')}</span>
                    <span>€{total.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full bg-black text-white py-4 mt-6 hover:bg-gray-800 transition-colors">
                  {t('buttons.checkout')}
                </button>
                <Link
                  href="/"
                  className="block text-center text-sm text-gray-600 mt-4 hover:text-black transition-colors"
                >
                  {t('buttons.continueShopping')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
