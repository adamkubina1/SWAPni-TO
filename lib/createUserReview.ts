import {
  collection,
  doc,
  Firestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

/**
 * Function that creates user review in Firestore
 * @param firestore
 * @param reviewedUserId
 * @param userId
 * @param review
 * @param stars Number of starts to give must be integer in range 1-5
 */
const createUserReview = async (
  firestore: Firestore,
  reviewedUserId: string,
  userId: string,
  review: string,
  stars: number
) => {
  const collectionPath = collection(
    firestore,
    `users/${reviewedUserId}/userReviews`
  );
  const docPath = doc(collectionPath, userId);

  await setDoc(docPath, {
    review: review,
    stars: stars,
    timestamp: serverTimestamp(),
  });
};

export { createUserReview };
