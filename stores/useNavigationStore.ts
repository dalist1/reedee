import { create} from 'zustand';
import { Navigation } from '@/types/navigation';

export const useNavigationStore = create<Navigation>((set) => ({
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
    goToNextPage: (numPages) => set((st) => (st.currentPage < numPages ? { currentPage: st.currentPage + 1 } : {})),
    goToPreviousPage: (numPages) => set((st) => (st.currentPage > 1 ? { currentPage: st.currentPage - 1 } : {})),
}));
