import { collection, query } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const useFetchAllOffersForBook = ({ bookId }: { bookId: string }) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, `/books/${bookId}/bookOffers`);
  const offersQuery = query(collectionRef);

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  });
};

const useFetchAllOffersForUser = ({ userId }: { userId: string }) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, `/users/${userId}/bookOffers`);
  const offersQuery = query(collectionRef);

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  });
};

export { useFetchAllOffersForBook, useFetchAllOffersForUser };
