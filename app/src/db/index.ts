import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('luxuria.db');
export const db = drizzle(sqlite, { schema });

// Initialize database with seed data
export async function initDb() {
  // Create tables
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      first_name TEXT,
      last_name TEXT,
      phone TEXT,
      role TEXT DEFAULT 'customer',
      preferred_language TEXT DEFAULT 'en',
      created_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name_en TEXT NOT NULL,
      name_de TEXT NOT NULL,
      name_sr TEXT NOT NULL,
      description_en TEXT,
      description_de TEXT,
      description_sr TEXT,
      image_url TEXT,
      display_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      sku TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      name_en TEXT NOT NULL,
      name_de TEXT NOT NULL,
      name_sr TEXT NOT NULL,
      description_en TEXT,
      description_de TEXT,
      description_sr TEXT,
      brand TEXT NOT NULL,
      price REAL NOT NULL,
      compare_price REAL,
      category_id TEXT REFERENCES categories(id),
      is_featured INTEGER DEFAULT 0,
      is_new INTEGER DEFAULT 0,
      created_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS product_images (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL REFERENCES products(id),
      url TEXT NOT NULL,
      alt TEXT,
      "order" INTEGER DEFAULT 0,
      is_primary INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS product_variants (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL REFERENCES products(id),
      sku TEXT NOT NULL,
      size TEXT,
      color TEXT,
      stock INTEGER DEFAULT 0,
      price_modifier REAL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      variant_id TEXT NOT NULL REFERENCES product_variants(id),
      quantity INTEGER DEFAULT 1,
      created_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id),
      session_id TEXT,
      product_id TEXT NOT NULL REFERENCES products(id),
      created_at INTEGER
    );
  `);
}
