export type Book = {
  id: number;
  title: string;
  author: string;
  fandom: string;
  cover: string;
  format: "PDF" | "EPUB";
  progress: number;
  favorite: boolean;
  file?: File;
};