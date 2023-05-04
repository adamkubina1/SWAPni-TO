import { collection, query } from 'firebase/firestore';
import {
  ObservableStatus,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { UserReviewType } from '../../types/UserReviewType';

type Response = UserReviewType & { id: string };

/**
 * Fetches all user review for certain user
 * @param userId
 * @returns Obsarvable status of review array
 */
const useFetchAllReviews = (userId: string) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, `/users/${userId}/userReviews`);
  const reviewsQuery = query(collectionRef);

  return useFirestoreCollectionData(reviewsQuery, {
    idField: 'id',
  }) as ObservableStatus<Array<Response>>;
};

export { useFetchAllReviews };
