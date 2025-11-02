import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  addToWishlist: (product) =>
    set((state) => {
      if (!state.items.find((p) => p.id === product.id)) {
        return { items: [...state.items, product] };
      }
      return state;
    }),
  removeFromWishlist: (id) =>
    set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
  isInWishlist: (id) => !!get().items.find((p) => p.id === id),
}));
