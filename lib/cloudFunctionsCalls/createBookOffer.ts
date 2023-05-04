import { Functions, httpsCallable } from 'firebase/functions';
import { BookOfferType } from '../types/BookOfferType';

const createBookOffer = async (
  functions: Functions,
  bookId: string,
  bookTitle: string,
  bookOfferData: BookOfferType
) => {
  const createBookOfferCall = httpsCallable(functions, 'createBookOffer');

  return createBookOfferCall({
    bookId: bookId,
    bookTitle: bookTitle,
    bookOffer: bookOfferData,
  });
};

export { createBookOffer };
