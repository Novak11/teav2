# Luxury E-Commerce Platform - Full Stack Specification

## Project Overview
Build a high-end luxury e-commerce platform inspired by Mytheresa, featuring elegant design, comprehensive shopping features, and multi-language support (Serbian, German, English).

---

## 1. Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Headless UI
- **State Management**: Zustand / Redux Toolkit
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios / TanStack Query
- **Internationalization**: next-i18next
- **Image Optimization**: Next.js Image component
- **Animations**: Framer Motion

### Backend
- **Framework**: Node.js with Express.js OR NestJS (recommended for structure)
- **Language**: TypeScript
- **Authentication**: JWT + Passport.js / Auth.js
- **Validation**: Joi / Zod
- **File Upload**: Multer + AWS S3 / Cloudinary
- **Email Service**: NodeMailer / SendGrid
- **Payment**: Stripe API

### Database
- **Primary DB**: PostgreSQL (with Prisma ORM)
- **Cache/Session**: Redis
- **File Storage**: AWS S3 / Cloudinary
- **Search**: Elasticsearch (optional, for advanced filtering)

### DevOps & Tools
- **Containerization**: Docker + Docker Compose
- **Version Control**: Git
- **API Documentation**: Swagger / OpenAPI
- **Testing**: Jest, React Testing Library, Supertest
- **Linting**: ESLint + Prettier

---

## 2. Database Schema

### Users Table
```sql
users:
  - id (UUID, PK)
  - email (VARCHAR, UNIQUE, NOT NULL)
  - password_hash (VARCHAR, NOT NULL)
  - first_name (VARCHAR)
  - last_name (VARCHAR)
  - phone (VARCHAR)
  - email_verified (BOOLEAN, DEFAULT false)
  - role (ENUM: 'customer', 'admin')
  - preferred_language (ENUM: 'sr', 'de', 'en')
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Addresses Table
```sql
addresses:
  - id (UUID, PK)
  - user_id (UUID, FK -> users.id)
  - address_type (ENUM: 'shipping', 'billing')
  - first_name (VARCHAR)
  - last_name (VARCHAR)
  - street_address (VARCHAR)
  - city (VARCHAR)
  - state (VARCHAR)
  - postal_code (VARCHAR)
  - country (VARCHAR)
  - phone (VARCHAR)
  - is_default (BOOLEAN)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Categories Table
```sql
categories:
  - id (UUID, PK)
  - name_en (VARCHAR)
  - name_de (VARCHAR)
  - name_sr (VARCHAR)
  - slug (VARCHAR, UNIQUE)
  - description_en (TEXT)
  - description_de (TEXT)
  - description_sr (TEXT)
  - parent_id (UUID, FK -> categories.id, nullable)
  - image_url (VARCHAR)
  - display_order (INTEGER)
  - is_active (BOOLEAN)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Products Table
```sql
products:
  - id (UUID, PK)
  - sku (VARCHAR, UNIQUE)
  - name_en (VARCHAR)
  - name_de (VARCHAR)
  - name_sr (VARCHAR)
  - description_en (TEXT)
  - description_de (TEXT)
  - description_sr (TEXT)
  - brand (VARCHAR)
  - base_price (DECIMAL(10,2))
  - currency (VARCHAR, DEFAULT 'EUR')
  - is_featured (BOOLEAN)
  - is_active (BOOLEAN)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Product Categories (Many-to-Many)
```sql
product_categories:
  - product_id (UUID, FK -> products.id)
  - category_id (UUID, FK -> categories.id)
  - PRIMARY KEY (product_id, category_id)
```

### Product Variants Table
```sql
product_variants:
  - id (UUID, PK)
  - product_id (UUID, FK -> products.id)
  - size (VARCHAR)
  - color (VARCHAR)
  - sku_variant (VARCHAR, UNIQUE)
  - stock_quantity (INTEGER)
  - price_adjustment (DECIMAL(10,2), DEFAULT 0)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Product Images Table
```sql
product_images:
  - id (UUID, PK)
  - product_id (UUID, FK -> products.id)
  - image_url (VARCHAR)
  - alt_text_en (VARCHAR)
  - alt_text_de (VARCHAR)
  - alt_text_sr (VARCHAR)
  - display_order (INTEGER)
  - is_primary (BOOLEAN)
  - created_at (TIMESTAMP)
```

### Cart Table
```sql
carts:
  - id (UUID, PK)
  - user_id (UUID, FK -> users.id, nullable for guest carts)
  - session_id (VARCHAR, for guest users)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Cart Items Table
```sql
cart_items:
  - id (UUID, PK)
  - cart_id (UUID, FK -> carts.id)
  - product_variant_id (UUID, FK -> product_variants.id)
  - quantity (INTEGER)
  - price_at_addition (DECIMAL(10,2))
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Favorites/Wishlist Table
```sql
favorites:
  - id (UUID, PK)
  - user_id (UUID, FK -> users.id)
  - product_id (UUID, FK -> products.id)
  - created_at (TIMESTAMP)
```

### Orders Table
```sql
orders:
  - id (UUID, PK)
  - order_number (VARCHAR, UNIQUE)
  - user_id (UUID, FK -> users.id)
  - status (ENUM: 'pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned')
  - subtotal (DECIMAL(10,2))
  - tax_amount (DECIMAL(10,2))
  - shipping_cost (DECIMAL(10,2))
  - total_amount (DECIMAL(10,2))
  - currency (VARCHAR)
  - shipping_address_id (UUID, FK -> addresses.id)
  - billing_address_id (UUID, FK -> addresses.id)
  - payment_status (ENUM: 'pending', 'paid', 'failed', 'refunded')
  - payment_method (VARCHAR)
  - payment_intent_id (VARCHAR)
  - tracking_number (VARCHAR)
  - notes (TEXT)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Order Items Table
```sql
order_items:
  - id (UUID, PK)
  - order_id (UUID, FK -> orders.id)
  - product_variant_id (UUID, FK -> product_variants.id)
  - product_name (VARCHAR)
  - variant_details (VARCHAR)
  - quantity (INTEGER)
  - unit_price (DECIMAL(10,2))
  - total_price (DECIMAL(10,2))
  - created_at (TIMESTAMP)
```

### Returns Table
```sql
returns:
  - id (UUID, PK)
  - return_number (VARCHAR, UNIQUE)
  - order_id (UUID, FK -> orders.id)
  - user_id (UUID, FK -> users.id)
  - status (ENUM: 'requested', 'approved', 'rejected', 'processing', 'completed')
  - reason (TEXT)
  - refund_amount (DECIMAL(10,2))
  - refund_status (ENUM: 'pending', 'processed', 'completed')
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

### Return Items Table
```sql
return_items:
  - id (UUID, PK)
  - return_id (UUID, FK -> returns.id)
  - order_item_id (UUID, FK -> order_items.id)
  - quantity (INTEGER)
  - reason (TEXT)
  - created_at (TIMESTAMP)
```

---

## 3. Backend API Endpoints

### Authentication & Authorization
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
POST   /api/auth/refresh-token     - Refresh access token
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password
POST   /api/auth/verify-email      - Verify email address
GET    /api/auth/me                - Get current user [Protected]
```

### User Profile
```
GET    /api/users/profile          - Get user profile [Protected]
PUT    /api/users/profile          - Update user profile [Protected]
PUT    /api/users/password         - Change password [Protected]
DELETE /api/users/account          - Delete user account [Protected]

GET    /api/users/addresses        - Get user addresses [Protected]
POST   /api/users/addresses        - Add new address [Protected]
PUT    /api/users/addresses/:id    - Update address [Protected]
DELETE /api/users/addresses/:id    - Delete address [Protected]
```

### Categories
```
GET    /api/categories             - Get all categories (with translations)
GET    /api/categories/:slug       - Get category by slug
GET    /api/categories/:id/products - Get products in category
```

### Products
```
GET    /api/products               - Get all products (with filters, pagination)
GET    /api/products/:id           - Get product details
GET    /api/products/search        - Search products
GET    /api/products/featured      - Get featured products
GET    /api/products/:id/variants  - Get product variants
GET    /api/products/:id/similar   - Get similar products

# Admin only
POST   /api/admin/products         - Create product [Admin]
PUT    /api/admin/products/:id     - Update product [Admin]
DELETE /api/admin/products/:id     - Delete product [Admin]
POST   /api/admin/products/:id/images - Upload product images [Admin]
```

### Cart
```
GET    /api/cart                   - Get cart (user or guest)
POST   /api/cart/items             - Add item to cart
PUT    /api/cart/items/:id         - Update cart item quantity
DELETE /api/cart/items/:id         - Remove item from cart
DELETE /api/cart                   - Clear cart
POST   /api/cart/merge             - Merge guest cart with user cart [Protected]
```

### Favorites/Wishlist
```
GET    /api/favorites              - Get user favorites [Protected]
POST   /api/favorites              - Add product to favorites [Protected]
DELETE /api/favorites/:productId   - Remove from favorites [Protected]
```

### Orders
```
GET    /api/orders                 - Get user orders [Protected]
GET    /api/orders/:id             - Get order details [Protected]
POST   /api/orders                 - Create order [Protected]
GET    /api/orders/:id/tracking    - Get order tracking info [Protected]

# Admin only
GET    /api/admin/orders           - Get all orders [Admin]
PUT    /api/admin/orders/:id/status - Update order status [Admin]
```

### Returns
```
GET    /api/returns                - Get user returns [Protected]
GET    /api/returns/:id            - Get return details [Protected]
POST   /api/returns                - Create return request [Protected]
PUT    /api/returns/:id/cancel     - Cancel return request [Protected]

# Admin only
GET    /api/admin/returns          - Get all returns [Admin]
PUT    /api/admin/returns/:id      - Update return status [Admin]
```

### Payment
```
POST   /api/payment/create-intent  - Create payment intent (Stripe) [Protected]
POST   /api/payment/confirm        - Confirm payment [Protected]
POST   /api/payment/webhook        - Stripe webhook handler
```

### Localization
```
GET    /api/locales/:lang          - Get translations for language
```

---

## 4. Frontend Pages & Components

### Public Pages
```
/                           - Homepage (featured products, categories)
/[lang]/shop                - Main shop page with filters
/[lang]/shop/clothing       - Clothing category
/[lang]/shop/footwear       - Footwear category
/[lang]/shop/jewelry        - Jewelry category
/[lang]/products/:slug      - Product detail page
/[lang]/search              - Search results
/[lang]/login               - Login page
/[lang]/register            - Registration page
/[lang]/forgot-password     - Password recovery
```

### Protected Pages (Require Authentication)
```
/[lang]/profile             - User profile dashboard
/[lang]/profile/edit        - Edit profile
/[lang]/profile/addresses   - Manage addresses
/[lang]/profile/orders      - Order history
/[lang]/profile/returns     - Return history
/[lang]/favorites           - Wishlist/Favorites
/[lang]/cart                - Shopping cart
/[lang]/checkout            - Checkout process
/[lang]/orders/:id          - Order confirmation/details
```

### Key Components

#### Layout Components
- **Header**: Logo, navigation, search, language selector, cart icon, user menu
- **Footer**: Links, newsletter signup, social media, payment icons
- **Navigation**: Multi-level category menu
- **MobileMenu**: Hamburger menu for mobile devices

#### Product Components
- **ProductCard**: Grid/list view with image, title, price, favorite button
- **ProductGallery**: Main image + thumbnail carousel
- **ProductInfo**: Details, size selector, color selector, add to cart
- **ProductFilters**: Price range, size, color, brand filters
- **SizeGuide**: Modal with size information

#### Shopping Components
- **CartSidebar**: Slide-out cart preview
- **CartItem**: Product in cart with quantity controls
- **CheckoutForm**: Multi-step checkout (shipping, payment, review)
- **PaymentForm**: Stripe payment integration
- **OrderSummary**: Price breakdown component

#### User Components
- **LoginForm**: Email/password login
- **RegisterForm**: Registration with validation
- **AddressForm**: Add/edit address
- **OrderCard**: Order in order history
- **ReturnForm**: Create return request

#### Common Components
- **Button**: Styled button with variants
- **Input**: Form input with validation
- **Select**: Dropdown select
- **Modal**: Reusable modal dialog
- **Toast**: Notification system
- **Loader**: Loading spinner
- **ImageUpload**: Image upload with preview
- **Pagination**: Page navigation
- **Breadcrumbs**: Navigation trail

---

## 5. Design System (Mytheresa-inspired)

### Color Palette
```css
/* Primary Colors */
--color-primary: #000000;        /* Black */
--color-secondary: #FFFFFF;      /* White */
--color-accent: #C19A6B;         /* Gold/Bronze */

/* Grayscale */
--color-gray-50: #F9FAFB;
--color-gray-100: #F3F4F6;
--color-gray-200: #E5E7EB;
--color-gray-300: #D1D5DB;
--color-gray-500: #6B7280;
--color-gray-700: #374151;
--color-gray-900: #111827;

/* Status Colors */
--color-success: #10B981;
--color-error: #EF4444;
--color-warning: #F59E0B;
--color-info: #3B82F6;
```

### Typography
```css
/* Font Families */
--font-primary: 'Inter', 'Helvetica Neue', sans-serif;
--font-display: 'Playfair Display', serif; /* For headings */

/* Font Sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
```

### Spacing
```css
--spacing-1: 0.25rem;    /* 4px */
--spacing-2: 0.5rem;     /* 8px */
--spacing-3: 0.75rem;    /* 12px */
--spacing-4: 1rem;       /* 16px */
--spacing-5: 1.25rem;    /* 20px */
--spacing-6: 1.5rem;     /* 24px */
--spacing-8: 2rem;       /* 32px */
--spacing-10: 2.5rem;    /* 40px */
--spacing-12: 3rem;      /* 48px */
--spacing-16: 4rem;      /* 64px */
```

### Layout Principles
- **Minimalist**: Clean, spacious design with plenty of white space
- **Grid System**: 12-column responsive grid
- **Breakpoints**: Mobile (320px), Tablet (768px), Desktop (1024px), Wide (1440px)
- **Images**: High-quality product photography, 2:3 aspect ratio for product cards
- **Typography**: Clean sans-serif for body, elegant serif for headings

---

## 6. Authentication & Authorization Flow

### Registration Flow
1. User fills registration form (email, password, first name, last name)
2. Backend validates data and checks for duplicate email
3. Hash password with bcrypt (salt rounds: 10)
4. Create user record with `email_verified: false`
5. Generate email verification token (JWT with 24h expiry)
6. Send verification email
7. Return success message (don't auto-login)

### Login Flow
1. User submits email and password
2. Backend validates credentials
3. Check if email is verified
4. Generate JWT access token (15min expiry) and refresh token (7 days expiry)
5. Store refresh token in httpOnly cookie
6. Return access token and user data
7. Frontend stores access token in memory/state (not localStorage)

### Protected Route Middleware
```javascript
// Backend middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    
    if (!req.user) throw new Error('User not found');
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Admin-only middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
```

### Token Refresh Flow
1. When access token expires (401 error)
2. Frontend sends refresh token to `/api/auth/refresh-token`
3. Backend validates refresh token
4. Generate new access token
5. Return new access token
6. Retry original request

---

## 7. Payment Integration (Stripe)

### Checkout Flow
1. User proceeds to checkout with items in cart
2. Frontend collects shipping/billing address
3. Frontend calls `POST /api/payment/create-intent` with order details
4. Backend:
   - Validates cart items and calculates total
   - Creates order record with status 'pending'
   - Creates Stripe PaymentIntent
   - Returns client_secret to frontend
5. Frontend displays Stripe payment form
6. User enters card details (handled by Stripe Elements)
7. Frontend confirms payment with Stripe
8. Stripe webhook notifies backend of payment status
9. Backend updates order status to 'processing' if successful
10. Frontend redirects to order confirmation page

### Stripe Configuration
```javascript
// Backend - Create Payment Intent
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (orderId, amount, currency) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: currency.toLowerCase(),
    metadata: { orderId },
    automatic_payment_methods: { enabled: true },
  });
  
  return paymentIntent;
};

// Webhook handler
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailure(event.data.object);
      break;
  }
  
  res.json({ received: true });
};
```

### Frontend - Stripe Integration
```javascript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// In checkout component
const [clientSecret, setClientSecret] = useState('');

useEffect(() => {
  // Create PaymentIntent
  fetch('/api/payment/create-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cartItems }),
  })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
}, []);

// Render payment form
<Elements stripe={stripePromise} options={{ clientSecret }}>
  <CheckoutForm />
</Elements>
```

---

## 8. Internationalization (i18n)

### Language Setup
Create translation files for each language:

```
/locales
  /en
    common.json
    products.json
    checkout.json
    auth.json
  /de
    common.json
    products.json
    checkout.json
    auth.json
  /sr
    common.json
    products.json
    checkout.json
    auth.json
```

### Example Translation File (common.json)
```json
{
  "en": {
    "nav": {
      "home": "Home",
      "shop": "Shop",
      "clothing": "Clothing",
      "footwear": "Footwear",
      "jewelry": "Jewelry",
      "cart": "Cart",
      "favorites": "Favorites",
      "profile": "Profile"
    },
    "buttons": {
      "addToCart": "Add to Cart",
      "buy": "Buy Now",
      "checkout": "Checkout",
      "continue": "Continue Shopping"
    }
  },
  "de": {
    "nav": {
      "home": "Startseite",
      "shop": "Shop",
      "clothing": "Kleidung",
      "footwear": "Schuhe",
      "jewelry": "Schmuck",
      "cart": "Warenkorb",
      "favorites": "Favoriten",
      "profile": "Profil"
    },
    "buttons": {
      "addToCart": "In den Warenkorb",
      "buy": "Jetzt kaufen",
      "checkout": "Zur Kasse",
      "continue": "Weiter einkaufen"
    }
  },
  "sr": {
    "nav": {
      "home": "Početna",
      "shop": "Prodavnica",
      "clothing": "Odeća",
      "footwear": "Obuća",
      "jewelry": "Nakit",
      "cart": "Korpa",
      "favorites": "Omiljeno",
      "profile": "Profil"
    },
    "buttons": {
      "addToCart": "Dodaj u korpu",
      "buy": "Kupi odmah",
      "checkout": "Plaćanje",
      "continue": "Nastavi kupovinu"
    }
  }
}
```

### Next.js i18n Configuration
```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'de', 'sr'],
    defaultLocale: 'en',
    localeDetection: true,
  },
};

// Usage in components
import { useTranslation } from 'next-i18next';

const Component = () => {
  const { t } = useTranslation('common');
  return <button>{t('buttons.addToCart')}</button>;
};
```

---

## 9. Key Features Implementation

### Product Filtering & Search
```javascript
// Backend - Product filter endpoint
GET /api/products?category=clothing&minPrice=100&maxPrice=500&size=M&color=black&brand=Gucci&sort=price_asc&page=1&limit=24

// Implementation
const getProducts = async (req, res) => {
  const {
    category,
    minPrice,
    maxPrice,
    size,
    color,
    brand,
    sort = 'created_at_desc',
    page = 1,
    limit = 24,
    search
  } = req.query;
  
  const query = {};
  
  if (category) query.categorySlug = category;
  if (minPrice || maxPrice) {
    query.base_price = {};
    if (minPrice) query.base_price.$gte = parseFloat(minPrice);
    if (maxPrice) query.base_price.$lte = parseFloat(maxPrice);
  }
  if (brand) query.brand = brand;
  if (search) {
    query.$or = [
      { name_en: { $regex: search, $options: 'i' } },
      { description_en: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Handle sorting
  const sortOptions = {
    'price_asc': { base_price: 1 },
    'price_desc': { base_price: -1 },
    'newest': { created_at: -1 },
    'popular': { sales_count: -1 }
  };
  
  const products = await Product.find(query)
    .sort(sortOptions[sort])
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('images')
    .populate('variants');
    
  const total = await Product.countDocuments(query);
  
  res.json({
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
};
```

### Cart Management (Guest + User)
```javascript
// Frontend - Cart store (Zustand)
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, variant, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(
          item => item.variantId === variant.id
        );
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.variantId === variant.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            items: [...items, {
              productId: product.id,
              variantId: variant.id,
              product,
              variant,
              quantity,
              price: product.base_price + variant.price_adjustment
            }]
          });
        }
        
        // Sync with backend if user is logged in
        if (get().isAuthenticated) {
          api.post('/api/cart/items', { variantId: variant.id, quantity });
        }
      },
      
      removeItem: (variantId) => {
        set({ items: get().items.filter(item => item.variantId !== variantId) });
        if (get().isAuthenticated) {
          api.delete(`/api/cart/items/${variantId}`);
        }
      },
      
      updateQuantity: (variantId, quantity) => {
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
        if (get().isAuthenticated) {
          api.put(`/api/cart/items/${variantId}`, { quantity });
        }
      },
      
      clearCart: () => {
        set({ items: [] });
        if (get().isAuthenticated) {
          api.delete('/api/cart');
        }
      },
      
      getTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage
    }
  )
);
```

### Favorites/Wishlist
```javascript
// Frontend - Favorites store
export const useFavoritesStore = create((set, get) => ({
  favorites: [],
  
  addFavorite: async (productId) => {
    try {
      await api.post('/api/favorites', { productId });
      set({ favorites: [...get().favorites, productId] });
    } catch (error) {
      console.error('Failed to add favorite:', error);
    }
  },
  
  removeFavorite: async (productId) => {
    try {
      await api.delete(`/api/favorites/${productId}`);
      set({ favorites: get().favorites.filter(id => id !== productId) });
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  },
  
  isFavorite: (productId) => {
    return get().favorites.includes(productId);
  },
  
  loadFavorites: async () => {
    try {
      const response = await api.get('/api/favorites');
      set({ favorites: response.data.map(fav => fav.productId) });
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }
}));

// Usage in ProductCard component
const ProductCard = ({ product }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(product.id);
  
  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };
  
  return (
    <div className="product-card">
      <button onClick={toggleFavorite}>
        {favorite ? <HeartFilled /> : <HeartOutline />}
      </button>
      {/* ... rest of product card */}
    </div>
  );
};
```

### Order & Return Management
```javascript
// Backend - Create return request
POST /api/returns

const createReturn = async (req, res) => {
  const { orderId, items, reason } = req.body;
  const userId = req.user.id;
  
  // Validate order belongs to user
  const order = await Order.findOne({ id: orderId, user_id: userId });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  // Check if return window is still open (e.g., 30 days)
  const orderDate = new Date(order.created_at);
  const daysSinceOrder = (Date.now() - orderDate) / (1000 * 60 * 60 * 24);
  if (daysSinceOrder > 30) {
    return res.status(400).json({ error: 'Return window has closed' });
  }
  
  // Calculate refund amount
  const refundAmount = items.reduce((sum, item) => {
    const orderItem = order.items.find(oi => oi.id === item.orderItemId);
    return sum + (orderItem.unit_price * item.quantity);
  }, 0);
  
  // Create return
  const returnNumber = `RET-${Date.now()}`;
  const returnRequest = await Return.create({
    return_number: returnNumber,
    order_id: orderId,
    user_id: userId,
    status: 'requested',
    reason,
    refund_amount: refundAmount,
    refund_status: 'pending'
  });
  
  // Create return items
  for (const item of items) {
    await ReturnItem.create({
      return_id: returnRequest.id,
      order_item_id: item.orderItemId,
      quantity: item.quantity,
      reason: item.reason || reason
    });
  }
  
  // Send email notification
  await sendReturnConfirmationEmail(userId, returnNumber);
  
  res.json({ returnRequest });
};
```

---

## 10. Security Best Practices

### Input Validation
```javascript
// Use Joi or Zod for request validation
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required()
});

// Middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
```

### Security Headers
```javascript
// Use Helmet.js
const helmet = require('helmet');
app.use(helmet());

// Additional security middleware
app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
}));
```

### SQL Injection Prevention
- Use Prisma ORM with parameterized queries
- Never concatenate user input directly into queries
- Validate and sanitize all inputs

### XSS Prevention
- Escape output in frontend templates
- Set proper Content-Security-Policy headers
- Sanitize user-generated content

### CSRF Protection
- Use CSRF tokens for state-changing operations
- Implement SameSite cookie attribute

---

## 11. Performance Optimization

### Frontend
- **Code Splitting**: Dynamic imports for routes and heavy components
- **Image Optimization**: Next.js Image component with lazy loading
- **Caching**: React Query for API response caching
- **Bundle Size**: Tree shaking and minification
- **CDN**: Serve static assets from CDN

### Backend
- **Database Indexing**: Index frequently queried fields
- **Query Optimization**: Use select(), pagination, and eager loading
- **Caching**: Redis for session storage and frequently accessed data
- **Rate Limiting**: Prevent API abuse
- **Compression**: Gzip/Brotli compression for responses

### Database
```sql
-- Create indexes for better performance
CREATE INDEX idx_products_category ON product_categories(category_id);
CREATE INDEX idx_products_price ON products(base_price);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_cart_user ON carts(user_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
```

---

## 12. Testing Strategy

### Unit Tests
```javascript
// Example product service test
describe('ProductService', () => {
  describe('getProducts', () => {
    it('should return products with pagination', async () => {
      const result = await productService.getProducts({ page: 1, limit: 10 });
      expect(result.products).toHaveLength(10);
      expect(result.pagination.total).toBeGreaterThan(0);
    });
    
    it('should filter products by category', async () => {
      const result = await productService.getProducts({ category: 'clothing' });
      result.products.forEach(product => {
        expect(product.categories).toContain('clothing');
      });
    });
  });
});
```

### Integration Tests
```javascript
// Example API endpoint test
describe('POST /api/auth/register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
  });
  
  it('should return error for duplicate email', async () => {
    // First registration
    await request(app).post('/api/auth/register').send({ /* ... */ });
    
    // Duplicate registration
    const response = await request(app).post('/api/auth/register').send({ /* ... */ });
    expect(response.status).toBe(400);
  });
});
```

### E2E Tests (Playwright/Cypress)
```javascript
// Example e2e test
describe('Checkout Flow', () => {
  it('should complete purchase', () => {
    cy.visit('/shop/clothing');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();
    cy.get('[data-testid="cart-icon"]').click();
    cy.get('[data-testid="checkout-button"]').click();
    
    // Fill shipping information
    cy.get('[name="firstName"]').type('John');
    cy.get('[name="lastName"]').type('Doe');
    // ... fill rest of form
    
    cy.get('[data-testid="place-order"]').click();
    cy.url().should('include', '/orders/');
    cy.contains('Order confirmed').should('be.visible');
  });
});
```

---

## 13. Deployment & DevOps

### Docker Setup
```dockerfile
# Dockerfile for backend
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: luxury_shop
      POSTGRES_USER: shopuser
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://shopuser:${DB_PASSWORD}@postgres:5432/luxury_shop
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
    depends_on:
      - postgres
      - redis
    ports:
      - "3001:3001"

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: http://backend:3001
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: ${STRIPE_PUBLISHABLE_KEY}
    depends_on:
      - backend
    ports:
      - "3000:3000"

volumes:
  postgres_data:
```

### Environment Variables
```env
# .env.example
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/luxury_shop
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# AWS S3 (optional)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### CI/CD Pipeline (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Your deployment script
          ssh user@server 'cd /app && git pull && docker-compose up -d'
```

---

## 14. Admin Panel (Bonus)

### Admin Features
- Product management (CRUD)
- Order management and status updates
- User management
- Return request handling
- Analytics dashboard (sales, revenue, popular products)
- Inventory management

### Admin Routes
```
/admin/dashboard          - Overview with key metrics
/admin/products           - Product list and management
/admin/products/new       - Add new product
/admin/products/:id/edit  - Edit product
/admin/orders             - Order management
/admin/returns            - Return requests
/admin/users              - User management
/admin/analytics          - Sales analytics
```

---

## 15. Implementation Timeline

### Phase 1: Foundation (Week 1-2)
- Project setup (Next.js + NestJS)
- Database schema design and migration
- Authentication system implementation
- Basic frontend layout and routing

### Phase 2: Core Features (Week 3-4)
- Product catalog with categories
- Product detail pages
- Shopping cart functionality
- User profile and addresses

### Phase 3: Shopping Flow (Week 5-6)
- Checkout process
- Stripe payment integration
- Order management
- Email notifications

### Phase 4: Additional Features (Week 7-8)
- Favorites/wishlist
- Return management
- Product filtering and search
- Internationalization (i18n)

### Phase 5: Polish & Testing (Week 9-10)
- UI/UX refinement
- Performance optimization
- Security hardening
- Testing (unit, integration, e2e)

### Phase 6: Deployment (Week 11-12)
- Docker containerization
- CI/CD pipeline setup
- Production deployment
- Monitoring and logging setup

---

## 16. Additional Resources

### Documentation to Read
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Design Inspiration
- Mytheresa.com (reference site)
- Net-a-Porter
- Farfetch
- MatchesFashion

### Testing Tools
- Jest for unit testing
- Supertest for API testing
- React Testing Library for component testing
- Playwright or Cypress for e2e testing

---

## 17. Success Criteria

Your implementation is successful when:
- ✅ User can browse products by category with filters
- ✅ User can register, login, and manage profile
- ✅ User can add products to cart and favorites
- ✅ User can complete checkout with Stripe payment
- ✅ User can view order history and create returns
- ✅ Site supports 3 languages (EN, DE, SR)
- ✅ Admin can manage products and orders
- ✅ Site is responsive (mobile, tablet, desktop)
- ✅ Performance: Page load < 3s, LCP < 2.5s
- ✅ Security: No vulnerabilities in OWASP Top 10
- ✅ All major features have test coverage > 70%

---

## Notes for AI Implementation

When Claude implements this specification:

1. **Start with database setup** - Get Prisma schema working first
2. **Build API layer next** - Test endpoints with Postman/Thunder Client
3. **Frontend comes after backend** - Ensure data flows correctly
4. **Implement features iteratively** - Don't try to build everything at once
5. **Test as you go** - Write tests alongside features
6. **Use TypeScript strictly** - Leverage type safety
7. **Follow the design system** - Maintain consistency
8. **Handle errors gracefully** - User-friendly error messages
9. **Optimize images** - Compress and use WebP format
10. **Document as you build** - Add comments and README files

Good luck building your luxury e-commerce platform! 🚀
