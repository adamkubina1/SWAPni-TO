import { BookOffer } from './BookOffer';

type ExchangeOffer = {
  bookId: string;
  bookOffer: BookOffer;
  bookOfferId: string;
  message: string;
  receiverUserId: string;
  senderUserId: string;
};

export type { ExchangeOffer };
