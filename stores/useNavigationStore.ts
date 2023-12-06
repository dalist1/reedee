import { create} from 'zustand';
import { Navigation } from '@/types/navigation';

export const useNavigationStore = create<Navigation>((set) => ({
 currentPage: 1,
 setCurrentPage: (page) => set({ currentPage: page }),
 goToNextPage: () => set((st) => (st.currentPage < st.pdfData.numPages ? { currentPage: st.currentPage + 1 } : {})),
 goToPreviousPage: () => set((st) => (st.currentPage > 1 ? { currentPage: st.currentPage - 1 } : {})),
}));