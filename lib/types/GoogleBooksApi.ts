type GoogleBookApiImageLinks = {
  smallThumbnail: string | undefined;
  thumbnail: string | undefined;
  small: string | undefined;
  medium: string | undefined;
  large: string | undefined;
  extraLarge: string | undefined;
};

type GoogleBookApiBook = {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: Array<string>;
    description: string;
    publishedDate: string;
    pageCount: number;
    language: string;
    industryIdentifiers: Array<{ type: string; identifier: string }>;

    imageLinks: GoogleBookApiImageLinks;
  };
};

type GoogleBookApiResponseType = {
  kind: string;
  items: Array<GoogleBookApiBook>;
  totalItems: number;
};

export type {
  GoogleBookApiResponseType,
  GoogleBookApiBook,
  GoogleBookApiImageLinks,
};
