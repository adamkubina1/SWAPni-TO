import { Functions, httpsCallable } from 'firebase/functions';
import { BookOffer } from '../types/BookOffer';

const createBookOffer = async (
  functions: Functions,
  bookId: string,
  bookOfferData: BookOffer
) => {
  const createBookOfferPromise = httpsCallable(functions, 'createBookOffer');

  return createBookOfferPromise({ bookId: bookId, bookOffer: bookOfferData });
};

export { createBookOffer };
