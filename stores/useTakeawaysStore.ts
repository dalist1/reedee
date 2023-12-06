import { create } from 'zustand'

type State = {
  isTakeawaysEnabled: boolean;
  toggleTakeaways: () => void;
}

export const useTakeawaysStore = create<State>((set) => ({
    isTakeawaysEnabled: false,
    toggleTakeaways: () => set((st) => ({ isTakeawaysEnabled: !st.isTakeawaysEnabled })),
}))
