import { create } from 'zustand';

type AudioStore = {
  audioUrl: string | null;
  setAudioUrl: (url: string | null) => void;
  isPlaying: boolean;
  setIsPlaying: (status: boolean) => void;
};

const usePlayAudioStore = create<AudioStore>((set) => ({
  audioUrl: null,
  setAudioUrl: (url) => set({ audioUrl: url }),
  isPlaying: false,
  setIsPlaying: (status) => set({ isPlaying: status }),
}));

export default usePlayAudioStore;
