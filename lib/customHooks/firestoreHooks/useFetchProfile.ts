import { doc, DocumentReference } from 'firebase/firestore';
import { ObservableStatus, useFirestore, useFirestoreDocData } from 'reactfire';
import { UserType } from '../../types/UsersType';

type Response = UserType & { id: string };

/**
 * Custom hook fetching user from Firebase based on id.
 * @param userId String of the fetched user.
 * @returns Reference to the document and its id.
 */
const useFetchProfile = (userId: string) => {
  const firestore = useFirestore();
  const path = `/users`;

  const ref = doc(firestore, path, userId) as DocumentReference<Response>;

  return useFirestoreDocData(ref, {
    idField: 'id',
  }) as ObservableStatus<Response>;
};

export { useFetchProfile };
