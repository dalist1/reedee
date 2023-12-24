import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

export const usePlayAudio = (paragraph: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [];
  const currentSentenceIndex = useRef(0);
  const audioElementRef = useRef(new Audio());

  const prefetchAudio = useCallback(async (text: string) => {
    try {
      const response = await axios.get(`https://gttsfastapi.vercel.app/tts/en`, {
        params: { text },
        responseType: 'blob',
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error('Error fetching audio:', error);
      throw error;
    }
  }, []);

  const playSentence = useCallback(
    async (index) => {
      if (index >= sentences.length || index < 0) {
        setIsPlaying(false);
        return;
      }

      setIsPlaying(true);
      currentSentenceIndex.current = index;
      audioElementRef.current.src = await prefetchAudio(sentences[index]);
      audioElementRef.current.play();

      audioElementRef.current.onended = () => {
        playSentence(index + 1);
      };
    },
    [sentences, prefetchAudio],
  );

  const togglePlayPause = useCallback(() => {
    const audioElement = audioElementRef.current;

    if (!audioElement.src) {
      playSentence(currentSentenceIndex.current);
    } else if (audioElement.paused) {
      audioElement.play();
      setIsPlaying(true);
    } else {
      audioElement.pause();
      setIsPlaying(false);
    }
  }, [playSentence]);

  return {
    togglePlayPause,
    isPlaying,
  };
};

export default usePlayAudio;
