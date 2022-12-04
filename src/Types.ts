export interface bookType {
  id: string;
  title: string;
  publisher: string;
  authors: string[];
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  previewLink: string;
  pageCount: number;
  shelf: string;
}