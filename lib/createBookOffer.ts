import { Firestore, collection, doc, writeBatch } from 'firebase/firestore';
import { BookOffer } from './types/BookOffer';

/**
 * Creates new book offer. Pushes to two different tables at the same time.
 * @param userId
 * @param bookId
 * @param firestore
 * @param bookOfferData
 */
const createBookOffer = async (
  userId: string,
  bookId: string,
  firestore: Firestore,
  bookOfferData: BookOffer
) => {
  const userRef = doc(
    collection(firestore, `/users/${userId}/book/${bookId}/bookOffers`)
  );
  const bookRef = doc(
    collection(firestore, `/books/${bookId}/user/${userId}/bookOffers`)
  );

  const batch = writeBatch(firestore);

  batch.set(userRef, bookOfferData);
  batch.set(bookRef, bookOfferData);

  await batch.commit();
};

export { createBookOffer };
