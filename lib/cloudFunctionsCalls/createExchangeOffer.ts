import { Functions, httpsCallable } from 'firebase/functions';
import { BookOffer } from '../types/BookOffer';

const createExchangeOffer = async (
  functions: Functions,
  bookOfferId: string,
  counterOfferId: string | null,
  targetUserId: string,
  bookId: string,
  bookOfferData: BookOffer,
  message: string,
  counterOffer: BookOffer | null
) => {
  const createExchangeOfferCall = httpsCallable(
    functions,
    'createExchangeOffer'
  );

  return createExchangeOfferCall({
    bookOfferId: bookOfferId,
    counterOfferId: counterOfferId,
    targetUserId: targetUserId,
    bookId: bookId,
    bookOffer: bookOfferData,
    counterOffer: counterOffer,
    message,
  });
};

export { createExchangeOffer };
