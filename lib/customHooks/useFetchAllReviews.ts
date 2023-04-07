import { collection, query } from 'firebase/firestore';
import {
  ObservableStatus,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { UserReview } from '../types/UserReview';

type Response = UserReview & { id: string };

const useFetchAllReviews = ({ userId }: { userId: string }) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, `/users/${userId}/userReviews`);
  const reviewsQuery = query(collectionRef);

  return useFirestoreCollectionData(reviewsQuery, {
    idField: 'id',
  }) as ObservableStatus<Array<Response>>;
};

export { useFetchAllReviews };
