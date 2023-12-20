import { useQuery } from '@tanstack/react-query';
import { splitTextIntoSentences } from '@/lib/utils';
import { mergeAudioBuffers } from '@/lib/utils';
import { audioBufferToWavBlob } from '@/lib/utils';

const fetchAudioData = async (currentPageText: string, audioContextRef: React.RefObject<AudioContext>) => {
  if (currentPageText) {
    const sentences = splitTextIntoSentences(currentPageText);
    const audioUrls = sentences.map(
      (sentence) => `https://gttsfastapi.vercel.app/tts/en?text=${encodeURIComponent(sentence)}`,
    );

    const responses = await Promise.all(audioUrls.map((url) => fetch(url)));
    const buffers = await Promise.all(responses.map((response) => response.arrayBuffer()));
    const decodedAudioDataArray = await Promise.all(
      buffers.map((buffer) => audioContextRef.current.decodeAudioData(buffer)),
    );

    const mergedBuffer = mergeAudioBuffers(decodedAudioDataArray, audioContextRef.current);
    const wavBlob = audioBufferToWavBlob(mergedBuffer);

    return {
      wavBlob,
    };
  }
};

export const useFetchAudioData = (currentPageText: string, audioContextRef) => {
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ['audioData', currentPageText],
    queryFn: () => fetchAudioData(currentPageText, audioContextRef),
  });
  return { data, isSuccess, isError, error, isLoading };
};
