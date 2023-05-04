import { collection, query, where } from 'firebase/firestore';
import {
  ObservableStatus,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { BookOfferType } from '../../types/BookOfferType';

type Response = BookOfferType & { id: string };

/**
 * Fetches all offers for a certain book
 * @param bookId
 * @returns Observable status of book offer array
 */
const useFetchAllOffersForBook = (bookId: string) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/bookOffers');
  const offersQuery = query(collectionRef, where('bookId', '==', bookId));

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  }) as ObservableStatus<Array<Response>>;
};

/**
 * Fetches all offer from certain user
 * @param userId
 * @returns Observable status of book offer array
 */
const useFetchAllOffersForUser = (userId: string | undefined) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/bookOffers');
  const offersQuery = query(collectionRef, where('userId', '==', userId));

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  }) as ObservableStatus<Array<Response>>;
};

export { useFetchAllOffersForBook, useFetchAllOffersForUser };
