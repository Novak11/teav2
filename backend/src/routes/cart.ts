import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../utils/db';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Helper to get or create cart
const getOrCreateCart = async (userId?: string, sessionId?: string) => {
  let cart;

  if (userId) {
    cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    images: {
                      where: { isPrimary: true },
                      take: 1
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  } else if (sessionId) {
    cart = await prisma.cart.findFirst({
      where: { sessionId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    images: {
                      where: { isPrimary: true },
                      take: 1
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        sessionId: userId ? undefined : sessionId || uuidv4()
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    images: {
                      where: { isPrimary: true },
                      take: 1
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  return cart;
};

// Get cart
router.get('/', async (req: Request, res: Response) => {
  try {
    const sessionId = req.headers['x-session-id'] as string;
    const authReq = req as AuthRequest;

    const cart = await getOrCreateCart(authReq.user?.id, sessionId);

    const total = cart.items.reduce((sum, item) => {
      return sum + item.priceAtAddition * item.quantity;
    }, 0);

    return res.json({
      ...cart,
      total,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return res.status(500).json({ error: 'Failed to get cart' });
  }
});

// Add item to cart
router.post('/items', async (req: Request, res: Response) => {
  try {
    const { variantId, quantity = 1 } = req.body;
    const sessionId = req.headers['x-session-id'] as string;
    const authReq = req as AuthRequest;

    if (!variantId) {
      return res.status(400).json({ error: 'Variant ID required' });
    }

    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { product: true }
    });

    if (!variant) {
      return res.status(404).json({ error: 'Product variant not found' });
    }

    if (variant.stockQuantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    const cart = await getOrCreateCart(authReq.user?.id, sessionId);

    // Check if item already exists in cart
    const existingItem = cart.items.find(item => item.productVariantId === variantId);

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    } else {
      const price = variant.product.basePrice + variant.priceAdjustment;
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productVariantId: variantId,
          quantity,
          priceAtAddition: price
        }
      });
    }

    // Return updated cart
    const updatedCart = await getOrCreateCart(authReq.user?.id, sessionId);
    const total = updatedCart.items.reduce((sum, item) => {
      return sum + item.priceAtAddition * item.quantity;
    }, 0);

    return res.json({
      ...updatedCart,
      total,
      itemCount: updatedCart.items.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Update cart item quantity
router.put('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const sessionId = req.headers['x-session-id'] as string;
    const authReq = req as AuthRequest;

    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const cart = await getOrCreateCart(authReq.user?.id, sessionId);
    const item = cart.items.find(i => i.id === id);

    if (!item) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity }
    });

    const updatedCart = await getOrCreateCart(authReq.user?.id, sessionId);
    const total = updatedCart.items.reduce((sum, i) => {
      return sum + i.priceAtAddition * i.quantity;
    }, 0);

    return res.json({
      ...updatedCart,
      total,
      itemCount: updatedCart.items.reduce((sum, i) => sum + i.quantity, 0)
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    return res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// Remove item from cart
router.delete('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sessionId = req.headers['x-session-id'] as string;
    const authReq = req as AuthRequest;

    const cart = await getOrCreateCart(authReq.user?.id, sessionId);
    const item = cart.items.find(i => i.id === id);

    if (!item) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.delete({ where: { id } });

    const updatedCart = await getOrCreateCart(authReq.user?.id, sessionId);
    const total = updatedCart.items.reduce((sum, i) => {
      return sum + i.priceAtAddition * i.quantity;
    }, 0);

    return res.json({
      ...updatedCart,
      total,
      itemCount: updatedCart.items.reduce((sum, i) => sum + i.quantity, 0)
    });
  } catch (error) {
    console.error('Remove cart item error:', error);
    return res.status(500).json({ error: 'Failed to remove cart item' });
  }
});

// Clear cart
router.delete('/', async (req: Request, res: Response) => {
  try {
    const sessionId = req.headers['x-session-id'] as string;
    const authReq = req as AuthRequest;

    const cart = await getOrCreateCart(authReq.user?.id, sessionId);

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    return res.json({ message: 'Cart cleared', items: [], total: 0, itemCount: 0 });
  } catch (error) {
    console.error('Clear cart error:', error);
    return res.status(500).json({ error: 'Failed to clear cart' });
  }
});

// Merge guest cart with user cart
router.post('/merge', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const guestCart = await prisma.cart.findFirst({
      where: { sessionId },
      include: { items: true }
    });

    if (!guestCart || guestCart.items.length === 0) {
      return res.json({ message: 'No guest cart to merge' });
    }

    const userCart = await getOrCreateCart(req.user!.id);

    // Merge items
    for (const item of guestCart.items) {
      const existingItem = userCart.items.find(
        i => i.productVariantId === item.productVariantId
      );

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + item.quantity }
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productVariantId: item.productVariantId,
            quantity: item.quantity,
            priceAtAddition: item.priceAtAddition
          }
        });
      }
    }

    // Delete guest cart
    await prisma.cart.delete({ where: { id: guestCart.id } });

    const updatedCart = await getOrCreateCart(req.user!.id);
    const total = updatedCart.items.reduce((sum, i) => {
      return sum + i.priceAtAddition * i.quantity;
    }, 0);

    return res.json({
      ...updatedCart,
      total,
      itemCount: updatedCart.items.reduce((sum, i) => sum + i.quantity, 0)
    });
  } catch (error) {
    console.error('Merge cart error:', error);
    return res.status(500).json({ error: 'Failed to merge cart' });
  }
});

export default router;
