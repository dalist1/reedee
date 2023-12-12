import { useEffect } from 'react';
import usePlayAudioStore from '@/stores/usePlayAudioStore';
import { useNavigationStore } from '@/stores/useNavigationStore'; // Import the navigation store

export const usePlayAudio = (currentPageText: string) => {
  const { audioUrl, setAudioUrl } = usePlayAudioStore();
  const { currentPage } = useNavigationStore(); // Use the navigation store to get the currentPage state

  useEffect(() => {
    if (currentPageText) {
      const newAudioUrl = `https://gttsfastapi.vercel.app/tts/en?text=${currentPageText}`;
      setAudioUrl(newAudioUrl);
    }
  }, [currentPageText, setAudioUrl]);

  useEffect(() => {
    setAudioUrl(null);
  }, [currentPage, setAudioUrl]);

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const stopAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.pause();
    }
  };

  return { playAudio, stopAudio };
};
