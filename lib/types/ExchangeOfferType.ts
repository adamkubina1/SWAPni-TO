import { BookOfferType } from './BookOfferType';

type ExchangeOfferType = {
  bookId: string;
  bookOffer: BookOfferType;
  counterOffer: BookOfferType;
  bookOfferId: string;
  counterOfferId: string;
  message: string;
  receiverUserId: string;
  senderUserId: string;
};

export type { ExchangeOfferType };
