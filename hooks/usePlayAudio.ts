import { useCallback, useEffect, useState, useRef } from 'react';
import { useGlobalAudioPlayer } from 'react-use-audio-player';

function splitTextIntoSentences(text) {
  return text.match(/[^\.!\?]+[\.!\?]+/g);
}

export const usePlayAudio = (currentPageText) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const { load, stop, playing, togglePlayPause } = useGlobalAudioPlayer();

  const textChunks = useRef([]);
  useEffect(() => {
    if (currentPageText) {
      textChunks.current = splitTextIntoSentences(currentPageText).map(
        (sentence) => `https://gttsfastapi.vercel.app/tts/en?text=${encodeURIComponent(sentence)}`,
      );
      setCurrentChunkIndex(0);
    }
  }, [currentPageText]);

  useEffect(() => {
    if (textChunks.current.length > 0 && currentChunkIndex < textChunks.current.length) {
      setIsLoading(true);
      load(textChunks.current[currentChunkIndex], {
        autoplay: true,
        html5: true,
        format: 'mp3',
        onend: () => setCurrentChunkIndex((index) => (index + 1) % textChunks.current.length),
      });
    }
  }, [currentChunkIndex, load]);

  const stopAudio = useCallback(() => {
    stop();
  }, [stop]);

  return { stopAudio, isLoading, isPlaying: playing, togglePlayPause };
};
