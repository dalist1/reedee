export type PdfData = {
  blobUrl: string;
  numPages: number;
  currentPageText: string;
  nextPageText: string;
};

export type ProcessedDataProps = {
  file: File;
  thumbnail: string;
  author: string;
  title: string;
  pdf: BlobUrl;
};

export type MetadataInfo = {
  Author: string;
  Title: string;
};
