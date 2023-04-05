import { Functions, httpsCallable } from 'firebase/functions';
import { BookOffer } from '../types/BookOffer';

const createExchangeOffer = async (
  functions: Functions,
  bookOfferId: string,
  targetUserId: string,
  bookId: string,
  bookOfferData: BookOffer,
  message: string
) => {
  const createExchangeOfferCall = httpsCallable(
    functions,
    'createExchangeOffer'
  );

  return createExchangeOfferCall({
    bookOfferId: bookOfferId,
    targetUserId: targetUserId,
    bookId: bookId,
    bookOffer: bookOfferData,
    message,
  });
};

export { createExchangeOffer };
