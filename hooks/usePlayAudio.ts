import { useEffect } from "react";
import { useState } from "react";

export const usePlayAudio = (currentPageText) => {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (currentPageText) {
      const audioUrl = `https://gttsfastapi.vercel.app/tts/en?text=${currentPageText}`;
      const audio = new Audio(audioUrl);
      setAudio(audio);
    }
  }, [currentPageText]);

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
    }
  };

  return { playAudio, stopAudio };
};

