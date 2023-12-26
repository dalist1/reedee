import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigationStore } from '@/stores/useNavigationStore';

export const usePlayAudio = (currentPageText: string, numPages?: number, currentPage?: number) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const regex = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/gm;
  const sentences = useRef(currentPageText.split(regex));
  const currentSentenceIndex = useRef(0);
  const audioElementRef = useRef<HTMLAudioElement>(new Audio());
  const audioQueue = useRef([]);

  const { goToNextPage } = useNavigationStore();

  const fetchAudio = useCallback((text: string) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const params = new URLSearchParams({ text });
      xhr.open('GET', `https://gttsfastapi.vercel.app/tts/en?${params}`);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        setIsLoading(false);
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

  const prefetchAudio = useCallback((text: string) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const params = new URLSearchParams({ text });
      xhr.open('GET', `https://gttsfastapi.vercel.app/tts/en?${params}`);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(URL.createObjectURL(xhr.response));
        } else {
          reject(new Error('Fetching audio failed with status: ' + xhr.status));
        }
      };
      xhr.onerror = () => {
        reject(new Error('Network error while fetching audio'));
      };
      xhr.send();
    });
  }, []);

  const playSentence = useCallback(
    async (index: number) => {
      setIsPlaying(true);
      currentSentenceIndex.current = index;

      let audioSrc;
      if (audioQueue.current.length > 0) {
        audioSrc = audioQueue.current.shift();
      } else {
        const sentence = sentences.current[index];
        audioSrc = await fetchAudio(sentence);
      }
      audioElementRef.current.src = audioSrc;
      audioElementRef.current.play().then(() => setIsLoading(false));

      if (index + 1 < sentences.current.length) {
        const nextSentence = sentences.current[index + 1];
        const nextAudioSrc = await prefetchAudio(nextSentence);
        audioQueue.current.push(nextAudioSrc);
      }

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
    [fetchAudio, numPages, currentPage, goToNextPage, prefetchAudio],
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
    audioQueue.current = [];
  }, []);

  useEffect(() => {
    cleanup();
    sentences.current = currentPageText.split(regex) || [];
    if (isPlaying) {
      const firstSentence = sentences.current[0];
      prefetchAudio(firstSentence).then((firstAudioSrc) => {
        audioQueue.current.push(firstAudioSrc);
        playSentence(0);
      });
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
