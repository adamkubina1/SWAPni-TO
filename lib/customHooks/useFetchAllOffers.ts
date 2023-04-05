import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const useFetchAllOffersForBook = ({ bookId }: { bookId: string }) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/bookOffers');
  const offersQuery = query(collectionRef, where( "bookId", '==', bookId));

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  });
};

const useFetchAllOffersForUser = ({ userId }: { userId: string }) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/bookOffers');
  const offersQuery = query(collectionRef, where( "userId", '==', userId));

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  });
};

export { useFetchAllOffersForBook, useFetchAllOffersForUser };

