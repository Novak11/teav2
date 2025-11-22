import { Router, Request, Response } from 'express';
import prisma from '../utils/db';

const router = Router();

// Get all products with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      brand,
      search,
      sort = 'newest',
      page = '1',
      limit = '24'
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: Record<string, unknown> = { isActive: true };

    if (category) {
      where.categories = {
        some: {
          category: { slug: category as string }
        }
      };
    }

    if (minPrice || maxPrice) {
      where.basePrice = {};
      if (minPrice) (where.basePrice as Record<string, number>).gte = parseFloat(minPrice as string);
      if (maxPrice) (where.basePrice as Record<string, number>).lte = parseFloat(maxPrice as string);
    }

    if (brand) {
      where.brand = brand;
    }

    if (search) {
      where.OR = [
        { nameEn: { contains: search as string } },
        { nameDe: { contains: search as string } },
        { nameSr: { contains: search as string } },
        { descriptionEn: { contains: search as string } },
        { brand: { contains: search as string } }
      ];
    }

    // Build order by
    let orderBy: Record<string, string> = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { basePrice: 'asc' };
    if (sort === 'price_desc') orderBy = { basePrice: 'desc' };
    if (sort === 'name') orderBy = { nameEn: 'asc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: {
            orderBy: { displayOrder: 'asc' }
          },
          variants: true,
          categories: {
            include: { category: true }
          }
        },
        orderBy,
        skip,
        take: limitNum
      }),
      prisma.product.count({ where })
    ]);

    return res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({ error: 'Failed to get products' });
  }
});

// Get featured products
router.get('/featured', async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1
        },
        variants: true
      },
      take: 8
    });

    return res.json(products);
  } catch (error) {
    console.error('Get featured products error:', error);
    return res.status(500).json({ error: 'Failed to get featured products' });
  }
});

// Search products
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, page = '1', limit = '24' } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where = {
      isActive: true,
      OR: [
        { nameEn: { contains: q as string } },
        { nameDe: { contains: q as string } },
        { nameSr: { contains: q as string } },
        { descriptionEn: { contains: q as string } },
        { brand: { contains: q as string } },
        { sku: { contains: q as string } }
      ]
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: {
            where: { isPrimary: true },
            take: 1
          },
          variants: true
        },
        skip,
        take: limitNum
      }),
      prisma.product.count({ where })
    ]);

    return res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Search products error:', error);
    return res.status(500).json({ error: 'Failed to search products' });
  }
});

// Get product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { displayOrder: 'asc' }
        },
        variants: true,
        categories: {
          include: { category: true }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    return res.status(500).json({ error: 'Failed to get product' });
  }
});

// Get product variants
router.get('/:id/variants', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const variants = await prisma.productVariant.findMany({
      where: { productId: id }
    });

    return res.json(variants);
  } catch (error) {
    console.error('Get variants error:', error);
    return res.status(500).json({ error: 'Failed to get variants' });
  }
});

// Get similar products
router.get('/:id/similar', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        categories: true
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const categoryIds = product.categories.map(c => c.categoryId);

    const similar = await prisma.product.findMany({
      where: {
        id: { not: id },
        isActive: true,
        categories: {
          some: { categoryId: { in: categoryIds } }
        }
      },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1
        }
      },
      take: 4
    });

    return res.json(similar);
  } catch (error) {
    console.error('Get similar products error:', error);
    return res.status(500).json({ error: 'Failed to get similar products' });
  }
});

export default router;
