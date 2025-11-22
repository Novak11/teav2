import { Router, Response } from 'express';
import prisma from '../utils/db';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Get user favorites
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user!.id },
      include: {
        product: {
          include: {
            images: {
              where: { isPrimary: true },
              take: 1
            },
            variants: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json(favorites.map(f => f.product));
  } catch (error) {
    console.error('Get favorites error:', error);
    return res.status(500).json({ error: 'Failed to get favorites' });
  }
});

// Add to favorites
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID required' });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if already in favorites
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: req.user!.id,
          productId
        }
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Product already in favorites' });
    }

    await prisma.favorite.create({
      data: {
        userId: req.user!.id,
        productId
      }
    });

    return res.status(201).json({ message: 'Added to favorites' });
  } catch (error) {
    console.error('Add to favorites error:', error);
    return res.status(500).json({ error: 'Failed to add to favorites' });
  }
});

// Remove from favorites
router.delete('/:productId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: req.user!.id,
          productId
        }
      }
    });

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    await prisma.favorite.delete({
      where: { id: favorite.id }
    });

    return res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    return res.status(500).json({ error: 'Failed to remove from favorites' });
  }
});

// Check if product is in favorites
router.get('/check/:productId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: req.user!.id,
          productId
        }
      }
    });

    return res.json({ isFavorite: !!favorite });
  } catch (error) {
    console.error('Check favorite error:', error);
    return res.status(500).json({ error: 'Failed to check favorite' });
  }
});

export default router;
