import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../utils/db';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Get user orders
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
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
        },
        shippingAddress: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    return res.status(500).json({ error: 'Failed to get orders' });
  }
});

// Get order by ID
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: { id, userId: req.user!.id },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  include: {
                    images: true
                  }
                }
              }
            }
          }
        },
        shippingAddress: true,
        billingAddress: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    return res.status(500).json({ error: 'Failed to get order' });
  }
});

// Create order
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { shippingAddressId, billingAddressId, paymentMethod, notes } = req.body;

    // Get user's cart
    const cart = await prisma.cart.findFirst({
      where: { userId: req.user!.id },
      include: {
        items: {
          include: {
            variant: {
              include: { product: true }
            }
          }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Validate addresses
    const shippingAddress = await prisma.address.findFirst({
      where: { id: shippingAddressId, userId: req.user!.id }
    });

    const billingAddress = await prisma.address.findFirst({
      where: { id: billingAddressId || shippingAddressId, userId: req.user!.id }
    });

    if (!shippingAddress || !billingAddress) {
      return res.status(400).json({ error: 'Invalid address' });
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + item.priceAtAddition * item.quantity;
    }, 0);

    const taxAmount = subtotal * 0.2; // 20% tax
    const shippingCost = subtotal > 500 ? 0 : 15; // Free shipping over 500
    const totalAmount = subtotal + taxAmount + shippingCost;

    // Create order
    const orderNumber = `ORD-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: req.user!.id,
        status: 'pending',
        subtotal,
        taxAmount,
        shippingCost,
        totalAmount,
        shippingAddressId,
        billingAddressId: billingAddressId || shippingAddressId,
        paymentMethod,
        notes,
        items: {
          create: cart.items.map(item => ({
            productVariantId: item.productVariantId,
            productName: item.variant.product.nameEn,
            variantDetails: `${item.variant.size || ''} ${item.variant.color || ''}`.trim(),
            quantity: item.quantity,
            unitPrice: item.priceAtAddition,
            totalPrice: item.priceAtAddition * item.quantity
          }))
        }
      },
      include: {
        items: true,
        shippingAddress: true
      }
    });

    // Update stock quantities
    for (const item of cart.items) {
      await prisma.productVariant.update({
        where: { id: item.productVariantId },
        data: {
          stockQuantity: {
            decrement: item.quantity
          }
        }
      });
    }

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get order tracking
router.get('/:id/tracking', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: { id, userId: req.user!.id },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        trackingNumber: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.json(order);
  } catch (error) {
    console.error('Get tracking error:', error);
    return res.status(500).json({ error: 'Failed to get tracking info' });
  }
});

export default router;
