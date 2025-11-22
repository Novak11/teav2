import { Router, Request, Response } from 'express';
import prisma from '../utils/db';

const router = Router();

// Get all categories
router.get('/', async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' }
        }
      }
    });

    // Return only top-level categories with their children
    const topLevel = categories.filter(c => !c.parentId);
    return res.json(topLevel);
  } catch (error) {
    console.error('Get categories error:', error);
    return res.status(500).json({ error: 'Failed to get categories' });
  }
});

// Get category by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' }
        },
        parent: true
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    return res.status(500).json({ error: 'Failed to get category' });
  }
});

// Get products in category
router.get('/:id/products', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = '1', limit = '24', sort = 'newest' } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    let orderBy: Record<string, string> = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { basePrice: 'asc' };
    if (sort === 'price_desc') orderBy = { basePrice: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          isActive: true,
          categories: {
            some: { categoryId: id }
          }
        },
        include: {
          images: {
            where: { isPrimary: true },
            take: 1
          },
          variants: true
        },
        orderBy,
        skip,
        take: limitNum
      }),
      prisma.product.count({
        where: {
          isActive: true,
          categories: {
            some: { categoryId: id }
          }
        }
      })
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
    console.error('Get category products error:', error);
    return res.status(500).json({ error: 'Failed to get products' });
  }
});

export default router;
