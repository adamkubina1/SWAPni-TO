import { collection, query, where } from 'firebase/firestore';
import {
  ObservableStatus,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { BookOffer } from '../types/BookOffer';

type Response = BookOffer & { id: string };

const useFetchAllOffersForBook = ({ bookId }: { bookId: string }) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/bookOffers');
  const offersQuery = query(collectionRef, where('bookId', '==', bookId));

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  }) as ObservableStatus<Array<Response>>;
};

const useFetchAllOffersForUser = ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/bookOffers');
  const offersQuery = query(collectionRef, where('userId', '==', userId));

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  }) as ObservableStatus<Array<Response>>;
};

export { useFetchAllOffersForBook, useFetchAllOffersForUser };
