import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface cartType {
    products: Product[];
    addToCart: (product: Omit<Product, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<cartType>()(
    persist(
        (set, get) => ({
            products: [],

            addToCart: (product) => {
                const existing = get().products.find((p) => p.id === product.id);
                if (existing) {
                    set({
                        products: get().products.map((p) =>
                            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                        ),
                    });
                } else {
                    set({ products: [...get().products, { ...product, quantity: 1 }] });
                }
            },

            removeFromCart: (id) => {
                set({ products: get().products.filter(p => p.id !== id) })
            },

            updateQuantity: (id, quantity) =>
                set({
                    products: get().products.map((p) =>
                        p.id === id ? { ...p, quantity: Math.max(0, quantity) } : p
                    )
                }),

            clearCart: () => set({
                products: []
            }),

            total: () =>
                get().products.reduce((total, p) => total + p.price * p.quantity, 0),
        }),

        {
            name: 'cart-storage',
            // getStorage: () => localStorage,
            // getStorage: () => (typeof window !== 'undefined' ? localStorage : undefined),
        }
    )
)