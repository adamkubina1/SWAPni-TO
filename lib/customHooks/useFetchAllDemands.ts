import { collection, query, where } from 'firebase/firestore';
import {
  ObservableStatus,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { BookDemand } from '../types/BookDemand';

type Response = BookDemand & { id: string };

const useFetchAllDemandsForUser = ({ userId }: { userId: string }) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/bookDemands');
  const offersQuery = query(collectionRef, where('userId', '==', userId));

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  }) as ObservableStatus<Array<Response>>;
};

export { useFetchAllDemandsForUser };
