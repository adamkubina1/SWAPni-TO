import { Functions, httpsCallable } from 'firebase/functions';

const createBookDemand = async (
  functions: Functions,
  bookId: string,
  bookTitle: string
) => {
  const createBookOfferCall = httpsCallable(functions, 'createBookDemand');

  return createBookOfferCall({ bookId: bookId, bookTitle: bookTitle });
};

export { createBookDemand };
