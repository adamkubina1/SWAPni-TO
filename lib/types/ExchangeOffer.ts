import { BookOffer } from './BookOffer';

type ExchangeOffer = {
  bookId: string;
  bookOffer: BookOffer;
  counterOffer: BookOffer;
  bookOfferId: string;
  counterOfferId: string;
  message: string;
  receiverUserId: string;
  senderUserId: string;
};

export type { ExchangeOffer };
