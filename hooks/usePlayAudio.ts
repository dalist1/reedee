import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigationStore } from '@/stores/useNavigationStore';
import nlp from 'compromise';

export const usePlayAudio = (currentPageText: string, numPages?: number, currentPage?: number) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sentences = useRef(nlp(currentPageText).sentences().out('array'));
  const currentSentenceIndex = useRef(0);
  const audioElementRef = useRef<HTMLAudioElement>(new Audio());

  const { goToNextPage } = useNavigationStore();

  const fetchAudio = useCallback((text) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const params = new URLSearchParams({ text });
      xhr.open('GET', `https://gttsfastapi.vercel.app/tts/en?${params}`);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        setIsLoading(false); // Audio finishes loading
        if (xhr.status === 200) {
          resolve(URL.createObjectURL(xhr.response));
        } else {
          reject(new Error('Fetching audio failed with status: ' + xhr.status));
        }
      };
      xhr.onerror = () => {
        setIsLoading(false);
        reject(new Error('Network error while fetching audio'));
      };
      xhr.send();
    });
  }, []);

  const playSentence = useCallback(
    async (index) => {
      setIsPlaying(true);
      currentSentenceIndex.current = index;
      const audioSrc = await fetchAudio(sentences.current[index]);
      audioElementRef.current.src = audioSrc;
      audioElementRef.current.play().then(() => setIsLoading(false)); // Set isLoading to false when audio starts playing

      audioElementRef.current.onended = () => {
        if (index + 1 < sentences.current.length) {
          playSentence(index + 1);
        } else {
          if (numPages && currentPage < numPages) {
            goToNextPage(numPages);
          } else {
            setIsPlaying(false);
          }
        }
      };
    },
    [fetchAudio, numPages, currentPage, goToNextPage],
  );

  const togglePlayPause = useCallback(() => {
    if (isLoading) {
      return;
    }

    if (!audioElementRef.current.src) {
      playSentence(0);
    } else if (audioElementRef.current.paused) {
      audioElementRef.current.play();
      setIsPlaying(true);
    } else {
      audioElementRef.current.pause();
      setIsPlaying(false);
    }
  }, [playSentence, isLoading]);

  const cleanup = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.removeAttribute('src');
      audioElementRef.current.load();
    }
    setIsPlaying(false);
    currentSentenceIndex.current = 0;
  }, []);

  useEffect(() => {
    cleanup();
    sentences.current = nlp(currentPageText).sentences().out('array') || [];
    if (isPlaying) {
      playSentence(0);
    }
  }, [currentPageText, cleanup]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    togglePlayPause,
    isPlaying,
    cleanup,
    isLoading,
  };
};

export default usePlayAudio;
