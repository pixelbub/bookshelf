export type Book = {
  id: number;
  title: string;
  author: string;
  fandom: string;
  cover?: string;
  coverFile?: File;
  format: "PDF" | "EPUB";
  progress: number;
  favorite: boolean;
  file?: File;
};