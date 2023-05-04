type GoogleBookApiImageLinksType = {
  smallThumbnail: string | undefined;
  thumbnail: string | undefined;
  small: string | undefined;
  medium: string | undefined;
  large: string | undefined;
  extraLarge: string | undefined;
};

type GoogleBookApiBookType = {
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

    averageRating: number | undefined;
    ratingsCount: number | undefined;

    imageLinks: GoogleBookApiImageLinksType;
  };
};

type GoogleBookApiResponseType = {
  kind: string;
  items: Array<GoogleBookApiBookType>;
  totalItems: number;
};

export type {
  GoogleBookApiResponseType,
  GoogleBookApiBookType,
  GoogleBookApiImageLinksType,
};
