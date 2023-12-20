import { useEffect, useCallback, useState, useRef } from 'react';
import { useAudioPlayer } from 'react-use-audio-player';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { useFetchAudioData } from './useFetchAudio';

export const usePlayAudio = (currentPageText?: string, numPages?: number) => {
  const { load, playing, togglePlayPause, cleanup } = useAudioPlayer();
  const audioContextRef = useRef(new AudioContext());
  const { goToNextPage } = useNavigationStore();
  const { data, isSuccess, isLoading } = useFetchAudioData(currentPageText, audioContextRef);

  const onPlaybackEnd = useCallback(() => {
    goToNextPage(numPages);
  }, [goToNextPage, numPages]);

  useEffect(() => {
    if (isSuccess && data) {
      const wavUrl = URL.createObjectURL(data.wavBlob);
      load(wavUrl, {
        autoplay: false,
        html5: true,
        format: 'wav',
        onend: onPlaybackEnd,
      });
      return () => {
        URL.revokeObjectURL(wavUrl);
      };
    }
  }, [isSuccess, data, load, onPlaybackEnd]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  return { playing, togglePlayPause, isLoading, cleanup };
};
