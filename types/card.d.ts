export type CardObject = {
  file: File;
  name: string;
  thumbnail: string;
  author: string;
  title: string;
  pdf: Blob;
  liked?: boolean;
};