import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Users
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: text('phone'),
  role: text('role').default('customer'),
  preferredLanguage: text('preferred_language').default('en'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Categories
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  nameEn: text('name_en').notNull(),
  nameDe: text('name_de').notNull(),
  nameSr: text('name_sr').notNull(),
  descriptionEn: text('description_en'),
  descriptionDe: text('description_de'),
  descriptionSr: text('description_sr'),
  imageUrl: text('image_url'),
  displayOrder: integer('display_order').default(0),
});

// Products
export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  sku: text('sku').notNull().unique(),
  slug: text('slug').notNull().unique(),
  nameEn: text('name_en').notNull(),
  nameDe: text('name_de').notNull(),
  nameSr: text('name_sr').notNull(),
  descriptionEn: text('description_en'),
  descriptionDe: text('description_de'),
  descriptionSr: text('description_sr'),
  brand: text('brand').notNull(),
  price: real('price').notNull(),
  comparePrice: real('compare_price'),
  categoryId: text('category_id').references(() => categories.id),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  isNew: integer('is_new', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Product Images
export const productImages = sqliteTable('product_images', {
  id: text('id').primaryKey(),
  productId: text('product_id').references(() => products.id).notNull(),
  url: text('url').notNull(),
  alt: text('alt'),
  order: integer('order').default(0),
  isPrimary: integer('is_primary', { mode: 'boolean' }).default(false),
});

// Product Variants
export const productVariants = sqliteTable('product_variants', {
  id: text('id').primaryKey(),
  productId: text('product_id').references(() => products.id).notNull(),
  sku: text('sku').notNull(),
  size: text('size'),
  color: text('color'),
  stock: integer('stock').default(0),
  priceModifier: real('price_modifier').default(0),
});

// Cart Items (session-based)
export const cartItems = sqliteTable('cart_items', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  variantId: text('variant_id').references(() => productVariants.id).notNull(),
  quantity: integer('quantity').default(1),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Favorites
export const favorites = sqliteTable('favorites', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  sessionId: text('session_id'),
  productId: text('product_id').references(() => products.id).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Types
export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;
export type ProductVariant = typeof productVariants.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
