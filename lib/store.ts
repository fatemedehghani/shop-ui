"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, CartItem } from "@/types/product";

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    quantity?: number,
    selectedSize?: string,
    selectedColor?: string
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
}

interface WishlistStore {
  items: Product[];
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;
  toggleItem: (product: Product) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: number) => boolean;
  removeItem: (productId: number) => void;
  clearWishlist: () => void;
}

const customStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(name, value);
    } catch {}
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(name);
    } catch {}
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (product, quantity = 1, selectedSize = "M", selectedColor = "Default") => {
        const itemId = `${product.id}-${selectedSize}-${selectedColor}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += quantity;
          set({ items: updated, isCartOpen: true });
        } else {
          set({
            items: [
              ...currentItems,
              {
                id: itemId,
                product,
                quantity,
                selectedSize,
                selectedColor,
              },
            ],
            isCartOpen: true,
          });
        }
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 100 ? 0 : 15;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShippingFee();
      },
    }),
    {
      name: "rive_cart_storage",
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isWishlistOpen: false,

      openWishlist: () => set({ isWishlistOpen: true }),
      closeWishlist: () => set({ isWishlistOpen: false }),
      toggleWishlist: () =>
        set((state) => ({ isWishlistOpen: !state.isWishlistOpen })),

      toggleItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.some((item) => item.id === product.id);

        if (exists) {
          set({
            items: currentItems.filter((item) => item.id !== product.id),
          });
          return false;
        } else {
          set({
            items: [...currentItems, product],
          });
          return true;
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "rive_wishlist_storage",
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
