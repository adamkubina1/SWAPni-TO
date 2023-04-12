import { Timestamp } from 'firebase/firestore';
import { BookState } from './BookState';

type BookOffer = {
  objectID?: string;
  bookState: BookState;
  bookTitle: string;
  userId: string;
  notes: string;
  bookId: string;
  timestamp?: Timestamp;
};

export type { BookOffer };
