import { useCallback, useEffect, useState, useRef } from 'react';
import { useAudioPlayer } from 'react-use-audio-player';

function splitTextIntoSentences(text) {
  return text.match(/[^\.!\?]+[\.!\?]+/g);
}

export const usePlayAudio = (currentPageText) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const { load, playing, togglePlayPause } = useAudioPlayer();
  const textChunks = useRef([]);

  useEffect(() => {
    if (currentPageText) {
      textChunks.current = splitTextIntoSentences(currentPageText).map(
        (sentence) => `https://gttsfastapi.vercel.app/tts/en?text=${encodeURIComponent(sentence)}`,
      );
      setCurrentChunkIndex(0);
    }
  }, [currentPageText]);

  const preloadNextSentence = useCallback(async (nextSentence) => {
    await fetch(nextSentence);
    console.log('Preloaded successfully: ', nextSentence);
  }, []);

  const playNextSentence = useCallback(
    (nextSentence) => {
      load(`https://gttsfastapi.vercel.app/tts/en?text=${encodeURIComponent(nextSentence)}`, {
        autoplay: true,
        html5: true,
        format: 'mp3',
      });
    },
    [load],
  );

  useEffect(() => {
    if (textChunks.current.length > 0 && currentChunkIndex < textChunks.current.length) {
      load(textChunks.current[currentChunkIndex], {
        autoplay: true,
        html5: true,
        format: 'mp3',
        onload: () => {
          setIsLoading(false);
          preloadNextSentence(textChunks.current[currentChunkIndex + 1]);
        },
        onend: () => {
          setCurrentChunkIndex((index) => (index + 1) % textChunks.current.length);
          playNextSentence(textChunks.current[currentChunkIndex]);
        },
      });
    }
  }, [currentChunkIndex, load]);

  return { playing, togglePlayPause, isLoading };
};
