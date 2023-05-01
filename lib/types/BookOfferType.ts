import { Timestamp } from 'firebase/firestore';
import { BookStateType } from './BookStateType';

type BookOfferType = {
  objectID?: string;
  bookState: BookStateType;
  bookTitle: string;
  userId: string;
  notes: string;
  bookId: string;
  timestamp?: Timestamp;
};

export type { BookOfferType };
