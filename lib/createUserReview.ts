import {
  collection,
  doc,
  Firestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

const createUserReview = async (
  firestore: Firestore,
  reviewedUserId: string,
  userId: string,
  message: string,
  stars: number
) => {
  const collectionPath = collection(
    firestore,
    `users/${reviewedUserId}/userReviews`
  );
  const docPath = doc(collectionPath, userId);

  await setDoc(docPath, {
    review: message,
    stars: stars,
    timestamp: serverTimestamp(),
  });
};

export { createUserReview };
