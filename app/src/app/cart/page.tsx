'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { Locale, t } from '@/lib/i18n';

// Mock cart data for demo
const mockCartItems = [
  {
    id: 'cart-1',
    productId: 'prod-1',
    productName: 'Silk Evening Gown',
    brand: 'Gucci',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    price: 4850,
    size: 'M',
    color: 'Noir',
    quantity: 1,
  },
];

export default function CartPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [cartItems, setCartItems] = useState(mockCartItems);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 500 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} onLocaleChange={setLocale} cartCount={cartItems.length} />

      <main className="py-12">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl lg:text-3xl font-light text-center mb-12"
          >
            {t(locale, 'cart.title')}
          </motion.h1>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-neutral-300" />
              <p className="text-neutral-500 mb-8">{t(locale, 'cart.empty')}</p>
              <Link href="/shop">
                <Button>{t(locale, 'cart.continueShopping')}</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-6 pb-6 border-b"
                    >
                      <Link href={`/product/${item.productId}`} className="shrink-0">
                        <div className="relative w-28 h-36 bg-neutral-100">
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="text-[11px] text-neutral-500 tracking-wider mb-1">
                              {item.brand.toUpperCase()}
                            </p>
                            <Link href={`/product/${item.productId}`}>
                              <h3 className="font-light hover:text-neutral-500 transition-colors">
                                {item.productName}
                              </h3>
                            </Link>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 hover:bg-neutral-100 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-sm text-neutral-500 space-y-1 mb-4">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-neutral-200">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-neutral-50 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-neutral-50 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-light">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Link
                  href="/shop"
                  className="inline-block text-sm underline text-neutral-500 hover:text-black transition-colors"
                >
                  {t(locale, 'cart.continueShopping')}
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-neutral-50 p-8"
                >
                  <h2 className="text-sm tracking-widest mb-6">ORDER SUMMARY</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">{t(locale, 'cart.subtotal')}</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">{t(locale, 'cart.shipping')}</span>
                      <span>{shipping === 0 ? t(locale, 'cart.free') : formatPrice(shipping)}</span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-xs text-green-600">
                        You qualify for complimentary shipping!
                      </p>
                    )}
                    {shipping > 0 && (
                      <p className="text-xs text-neutral-500">
                        Spend {formatPrice(500 - subtotal)} more for free shipping
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-4 mb-8">
                    <div className="flex justify-between">
                      <span className="font-medium">{t(locale, 'cart.total')}</span>
                      <span className="font-medium">{formatPrice(total)}</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">Including VAT</p>
                  </div>

                  <Button size="lg" className="w-full mb-4">
                    {t(locale, 'cart.checkout')}
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-neutral-500 mb-2">Secure checkout</p>
                    <div className="flex justify-center gap-2 text-xs text-neutral-400">
                      <span>VISA</span>
                      <span>MASTERCARD</span>
                      <span>AMEX</span>
                      <span>PAYPAL</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
