import { create } from 'zustand'

type State = {
  isSummaryEnabled: boolean;
  toggleSummary: () => void;
}

export const useSummaryStore = create<State>((set) => ({
  isSummaryEnabled: false,
  toggleSummary: () => set((st) => ({ isSummaryEnabled: !st.isSummaryEnabled })),
}))
