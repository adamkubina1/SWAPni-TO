import { Functions, httpsCallable } from 'firebase/functions';
import { BookOfferType } from '../types/BookOfferType';

const createExchangeOffer = async (
  functions: Functions,
  bookOfferId: string,
  counterOfferId: string | null,
  targetUserId: string,
  bookId: string,
  bookOfferData: BookOfferType,
  message: string,
  counterOffer: BookOfferType | null
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
