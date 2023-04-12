import { Functions, httpsCallable } from 'firebase/functions';
import { BookOffer } from '../types/BookOffer';

const createBookOffer = async (
  functions: Functions,
  bookId: string,
  bookTitle: string,
  bookOfferData: BookOffer
) => {
  const createBookOfferCall = httpsCallable(functions, 'createBookOffer');

  return createBookOfferCall({
    bookId: bookId,
    bookTitle: bookTitle,
    bookOffer: bookOfferData,
  });
};

export { createBookOffer };
