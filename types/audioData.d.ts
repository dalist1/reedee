export type AudioDataProps = {
  currentPageText: string;
  audioContextRef: React.RefObject<AudioContext>;
  nextPageText?: string;
  numPages?: number;
};

export type AudioDataResult = {
  data?: FetchAudioDataResult;
  isSuccess: boolean;
  isLoading: boolean;
};

export type FetchAudioDataResult = {
  wavBlob: Blob;
};
