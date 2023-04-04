import { Functions, httpsCallable } from 'firebase/functions';
import { BookOffer } from '../types/BookOffer';

const acceptExchangeOffer = async (
  functions: Functions,
  bookId: string,
  bookOfferData: BookOffer
) => {
  const acceptExchangeOfferCall = httpsCallable(functions, 'acceptExchangeOffer');

  return acceptExchangeOfferCall({ bookId: bookId, bookOffer: bookOfferData });
};

export { acceptExchangeOffer };

