import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { LibSQLAdapter } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';

const libsql = createClient({
  url: 'file:./prisma/dev.db'
});
const adapter = new LibSQLAdapter(libsql);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@luxuryshop.com' },
    update: {},
    create: {
      email: 'admin@luxuryshop.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      emailVerified: true
    }
  });
  console.log('Created admin user:', admin.email);

  // Create test user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      passwordHash: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'customer',
      emailVerified: true
    }
  });
  console.log('Created test user:', user.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'clothing' },
      update: {},
      create: {
        nameEn: 'Clothing',
        nameDe: 'Kleidung',
        nameSr: 'Odeca',
        slug: 'clothing',
        descriptionEn: 'Luxury designer clothing',
        descriptionDe: 'Luxus Designer-Kleidung',
        descriptionSr: 'Luksuzna dizajnerska odeca',
        displayOrder: 1,
        imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'footwear' },
      update: {},
      create: {
        nameEn: 'Footwear',
        nameDe: 'Schuhe',
        nameSr: 'Obuca',
        slug: 'footwear',
        descriptionEn: 'Premium designer footwear',
        descriptionDe: 'Premium Designer-Schuhe',
        descriptionSr: 'Premium dizajnerska obuca',
        displayOrder: 2,
        imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'jewelry' },
      update: {},
      create: {
        nameEn: 'Jewelry',
        nameDe: 'Schmuck',
        nameSr: 'Nakit',
        slug: 'jewelry',
        descriptionEn: 'Exquisite fine jewelry',
        descriptionDe: 'Exquisiter Schmuck',
        descriptionSr: 'Izuzetan fini nakit',
        displayOrder: 3,
        imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'bags' },
      update: {},
      create: {
        nameEn: 'Bags',
        nameDe: 'Taschen',
        nameSr: 'Torbe',
        slug: 'bags',
        descriptionEn: 'Luxury designer bags',
        descriptionDe: 'Luxus Designer-Taschen',
        descriptionSr: 'Luksuzne dizajnerske torbe',
        displayOrder: 4,
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800'
      }
    })
  ]);
  console.log('Created categories:', categories.length);

  // Create products
  const products = [
    {
      sku: 'GUC-DRS-001',
      nameEn: 'Silk Evening Dress',
      nameDe: 'Seiden-Abendkleid',
      nameSr: 'Svilena Vecernja Haljina',
      descriptionEn: 'Elegant silk evening dress with intricate embroidery. Perfect for special occasions.',
      descriptionDe: 'Elegantes Seiden-Abendkleid mit aufwendiger Stickerei. Perfekt fur besondere Anlasse.',
      descriptionSr: 'Elegantna svilena vecernja haljina sa preciznim vezom. Savrsena za posebne prilike.',
      brand: 'Gucci',
      basePrice: 2450,
      isFeatured: true,
      categorySlug: 'clothing',
      images: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
        'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800'
      ],
      variants: [
        { size: 'XS', color: 'Black', stock: 5 },
        { size: 'S', color: 'Black', stock: 8 },
        { size: 'M', color: 'Black', stock: 10 },
        { size: 'L', color: 'Black', stock: 6 },
        { size: 'S', color: 'Navy', stock: 4 },
        { size: 'M', color: 'Navy', stock: 7 }
      ]
    },
    {
      sku: 'PRA-BAG-001',
      nameEn: 'Saffiano Leather Tote',
      nameDe: 'Saffiano Leder-Tasche',
      nameSr: 'Saffiano Kozna Torba',
      descriptionEn: 'Iconic Saffiano leather tote bag with gold-tone hardware.',
      descriptionDe: 'Ikonische Saffiano-Leder-Tasche mit goldfarbenen Beschlagen.',
      descriptionSr: 'Ikonicna Saffiano kozna torba sa zlatnim detaljima.',
      brand: 'Prada',
      basePrice: 1890,
      isFeatured: true,
      categorySlug: 'bags',
      images: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
        'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800'
      ],
      variants: [
        { size: 'One Size', color: 'Black', stock: 12 },
        { size: 'One Size', color: 'Beige', stock: 8 },
        { size: 'One Size', color: 'Red', stock: 5 }
      ]
    },
    {
      sku: 'LV-SHO-001',
      nameEn: 'Archlight Sneakers',
      nameDe: 'Archlight Sneaker',
      nameSr: 'Archlight Patike',
      descriptionEn: 'Futuristic Archlight sneakers with signature wave-shaped sole.',
      descriptionDe: 'Futuristische Archlight-Sneaker mit der charakteristischen wellenformigen Sohle.',
      descriptionSr: 'Futuristicke Archlight patike sa prepoznatljivim djonom u obliku talasa.',
      brand: 'Louis Vuitton',
      basePrice: 1250,
      isFeatured: true,
      categorySlug: 'footwear',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800'
      ],
      variants: [
        { size: '36', color: 'White', stock: 6 },
        { size: '37', color: 'White', stock: 8 },
        { size: '38', color: 'White', stock: 10 },
        { size: '39', color: 'White', stock: 9 },
        { size: '40', color: 'White', stock: 7 }
      ]
    },
    {
      sku: 'CAR-JWL-001',
      nameEn: 'Love Bracelet',
      nameDe: 'Love Armband',
      nameSr: 'Love Narukvica',
      descriptionEn: '18K yellow gold Love bracelet with iconic screw motif.',
      descriptionDe: '18K Gelbgold Love Armband mit ikonischem Schraubenmotiv.',
      descriptionSr: '18K zuto zlato Love narukvica sa ikonicnim motivom zavrtnja.',
      brand: 'Cartier',
      basePrice: 6850,
      isFeatured: true,
      categorySlug: 'jewelry',
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800'
      ],
      variants: [
        { size: '16', color: 'Yellow Gold', stock: 3 },
        { size: '17', color: 'Yellow Gold', stock: 4 },
        { size: '18', color: 'Yellow Gold', stock: 5 }
      ]
    },
    {
      sku: 'DIO-DRS-001',
      nameEn: 'Tailored Wool Coat',
      nameDe: 'Massgeschneiderter Wollmantel',
      nameSr: 'Krojen Vuneni Kaput',
      descriptionEn: 'Classic tailored wool coat with silk lining.',
      descriptionDe: 'Klassischer massgeschneiderter Wollmantel mit Seidenfutter.',
      descriptionSr: 'Klasican krojen vuneni kaput sa svilenom postavom.',
      brand: 'Dior',
      basePrice: 3200,
      isFeatured: true,
      categorySlug: 'clothing',
      images: [
        'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'
      ],
      variants: [
        { size: 'XS', color: 'Camel', stock: 4 },
        { size: 'S', color: 'Camel', stock: 6 },
        { size: 'M', color: 'Camel', stock: 8 },
        { size: 'L', color: 'Camel', stock: 5 }
      ]
    },
    {
      sku: 'HER-BAG-001',
      nameEn: 'Birkin 25',
      nameDe: 'Birkin 25',
      nameSr: 'Birkin 25',
      descriptionEn: 'Iconic Birkin bag in Togo leather with palladium hardware.',
      descriptionDe: 'Ikonische Birkin-Tasche aus Togo-Leder mit Palladium-Beschlagen.',
      descriptionSr: 'Ikonicna Birkin torba od Togo koze sa paladijumskim detaljima.',
      brand: 'Hermes',
      basePrice: 12500,
      isFeatured: true,
      categorySlug: 'bags',
      images: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
        'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800'
      ],
      variants: [
        { size: '25', color: 'Black', stock: 2 },
        { size: '25', color: 'Gold', stock: 1 }
      ]
    },
    {
      sku: 'CHL-SHO-001',
      nameEn: 'Ankle Boots',
      nameDe: 'Stiefeletten',
      nameSr: 'Gleznjace',
      descriptionEn: 'Sophisticated ankle boots in smooth calfskin leather.',
      descriptionDe: 'Raffinierte Stiefeletten aus glattem Kalbsleder.',
      descriptionSr: 'Sofisticirane gleznjace od glatke telecje koze.',
      brand: 'Chloe',
      basePrice: 980,
      isFeatured: false,
      categorySlug: 'footwear',
      images: [
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
        'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800'
      ],
      variants: [
        { size: '36', color: 'Black', stock: 5 },
        { size: '37', color: 'Black', stock: 7 },
        { size: '38', color: 'Black', stock: 9 },
        { size: '39', color: 'Black', stock: 6 }
      ]
    },
    {
      sku: 'BVL-JWL-001',
      nameEn: 'Serpenti Necklace',
      nameDe: 'Serpenti Halskette',
      nameSr: 'Serpenti Ogrlica',
      descriptionEn: 'Stunning Serpenti necklace in 18K white gold with pave diamonds.',
      descriptionDe: 'Atemberaubende Serpenti-Halskette aus 18K Weissgold mit Pave-Diamanten.',
      descriptionSr: 'Zapanjujuca Serpenti ogrlica od 18K belog zlata sa pave dijamantima.',
      brand: 'Bulgari',
      basePrice: 18500,
      isFeatured: false,
      categorySlug: 'jewelry',
      images: [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'
      ],
      variants: [
        { size: 'One Size', color: 'White Gold', stock: 2 }
      ]
    }
  ];

  for (const productData of products) {
    const category = categories.find(c => c.slug === productData.categorySlug);
    if (!category) continue;

    const product = await prisma.product.upsert({
      where: { sku: productData.sku },
      update: {},
      create: {
        sku: productData.sku,
        nameEn: productData.nameEn,
        nameDe: productData.nameDe,
        nameSr: productData.nameSr,
        descriptionEn: productData.descriptionEn,
        descriptionDe: productData.descriptionDe,
        descriptionSr: productData.descriptionSr,
        brand: productData.brand,
        basePrice: productData.basePrice,
        isFeatured: productData.isFeatured,
        categories: {
          create: { categoryId: category.id }
        }
      }
    });

    // Create images
    for (let i = 0; i < productData.images.length; i++) {
      const imageId = `${product.id}-img-${i}`;
      const existingImage = await prisma.productImage.findUnique({ where: { id: imageId } });
      if (!existingImage) {
        await prisma.productImage.create({
          data: {
            id: imageId,
            productId: product.id,
            imageUrl: productData.images[i]!,
            altTextEn: productData.nameEn,
            altTextDe: productData.nameDe,
            altTextSr: productData.nameSr,
            displayOrder: i,
            isPrimary: i === 0
          }
        });
      }
    }

    // Create variants
    for (const variant of productData.variants) {
      const skuVariant = `${productData.sku}-${variant.size}-${variant.color}`.replace(/\s+/g, '-');
      const existingVariant = await prisma.productVariant.findUnique({ where: { skuVariant } });
      if (!existingVariant) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            size: variant.size,
            color: variant.color,
            skuVariant,
            stockQuantity: variant.stock
          }
        });
      }
    }

    console.log('Created product:', productData.nameEn);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
