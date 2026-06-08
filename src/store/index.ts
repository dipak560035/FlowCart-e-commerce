import { create } from "zustand";
import { Product, CartItem } from "@/types";

interface Store {
  cart: CartItem[];
  wishlist: Product[];
  quickViewProduct: Product | null;
  isQuickViewOpen: boolean;
  isMobileMenuOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  toggleMobileMenu: () => void;
}

export const useStore = create<Store>((set) => ({
  cart: [],
  wishlist: [],
  quickViewProduct: null,
  isQuickViewOpen: false,
  isMobileMenuOpen: false,

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),

  toggleWishlist: (product) =>
    set((state) => {
      const existing = state.wishlist.find((item) => item.id === product.id);
      if (existing) {
        return {
          wishlist: state.wishlist.filter((item) => item.id !== product.id),
        };
      }
      return { wishlist: [...state.wishlist, product] };
    }),

  openQuickView: (product) =>
    set({ quickViewProduct: product, isQuickViewOpen: true }),

  closeQuickView: () => set({ isQuickViewOpen: false, quickViewProduct: null }),

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));
