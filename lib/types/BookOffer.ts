import { BookState } from './BookState';

type BookOffer = {
  bookState: BookState;
  bookTitle: string;
  userId: string;
  notes: string;
  bookId: string;
};

export type { BookOffer };
