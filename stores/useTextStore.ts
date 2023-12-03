import { create } from 'zustand'

type State = {
 selectedSize: number;
 sizeClasses: string[];
 setSelectedSize: (index: number) => void;
}

export const useTextStore = create<State>((set) => ({
 selectedSize: 1,
 sizeClasses: ['text-sm', 'text-lg', 'text-xl'],
 setSelectedSize: (index: number) => set(() => ({ selectedSize: index })),
}));
