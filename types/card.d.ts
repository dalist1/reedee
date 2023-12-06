export type CardObject = {
  file: File;
  name: string;
  thumbnail: string;
  authorName: string;
  title: string;
  pdf: Blob;
  liked?: boolean;
};