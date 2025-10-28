import { create } from 'zustand';

interface cartType {
    count: number;
    addItem: () => void;
    removeItem: () => void;
    resetCart: () => void;
}

const useCartCountStore = create<cartType>((set) => ({
    count: 0,
    addItem: () => set((state) => ({ count: state.count + 1 })),
    removeItem: () => set((state) => ({ count: Math.max(state.count - 1, 0), })),
    resetCart: () => set((state) => ({ count: 0 })),
}));

export default useCartCountStore;
