import { create } from 'zustand'

type State = {
  isBionicEnabled: boolean;
  toggleBionic: () => void;
}

export const useBionicStore = create<State>((set) => ({
  isBionicEnabled: false,
  toggleBionic: () => set((st) => ({ isBionicEnabled: !st.isBionicEnabled })),
}))