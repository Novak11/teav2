export interface Product {
  id: string;
  sku: string;
  nameEn: string;
  nameDe: string;
  nameSr: string;
  descriptionEn: string | null;
  descriptionDe: string | null;
  descriptionSr: string | null;
  brand: string;
  basePrice: number;
  currency: string;
  isFeatured: boolean;
  isActive: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  categories: { category: Category }[];
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  altTextEn: string | null;
  altTextDe: string | null;
  altTextSr: string | null;
  displayOrder: number;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  size: string | null;
  color: string | null;
  skuVariant: string;
  stockQuantity: number;
  priceAdjustment: number;
}

export interface Category {
  id: string;
  nameEn: string;
  nameDe: string;
  nameSr: string;
  slug: string;
  descriptionEn: string | null;
  descriptionDe: string | null;
  descriptionSr: string | null;
  imageUrl: string | null;
  children?: Category[];
}

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  role: string;
  preferredLanguage: string;
}

export interface CartItem {
  id: string;
  productVariantId: string;
  quantity: number;
  priceAtAddition: number;
  variant: ProductVariant & {
    product: Product;
  };
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Address {
  id: string;
  addressType: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;
  phone: string | null;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
  currency: string;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: Address;
}

export interface OrderItem {
  id: string;
  productName: string;
  variantDetails: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type Language = 'en' | 'de' | 'sr';
