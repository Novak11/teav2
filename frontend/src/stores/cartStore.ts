import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '@/types';
import { cartApi } from '@/lib/api';

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: null,
      isLoading: false,
      error: null,

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartApi.get();
          set({ cart: response.data, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch cart', isLoading: false });
        }
      },

      addItem: async (variantId: string, quantity = 1) => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartApi.addItem(variantId, quantity);
          set({ cart: response.data, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to add item', isLoading: false });
        }
      },

      updateItem: async (itemId: string, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartApi.updateItem(itemId, quantity);
          set({ cart: response.data, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to update item', isLoading: false });
        }
      },

      removeItem: async (itemId: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await cartApi.removeItem(itemId);
          set({ cart: response.data, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to remove item', isLoading: false });
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          await cartApi.clear();
          set({ cart: { id: '', items: [], total: 0, itemCount: 0 }, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to clear cart', isLoading: false });
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
