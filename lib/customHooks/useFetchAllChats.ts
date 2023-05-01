import { collection, or, query, where } from 'firebase/firestore';
import {
  ObservableStatus,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { Chat } from '../types/Chat';

type Response = Array<Chat & { id: string }>;

/**
 * Hook fetching all chats where passed userId is either involved in
 * @param userId
 * @returns Obsarveble status of chats array
 */
const useFetchAllChats = (userId: string) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/chats');
  const offersQuery = query(
    collectionRef,
    or(
      where('exchangeOfferData.receiverUserId', '==', userId),
      where('exchangeOfferData.senderUserId', '==', userId)
    )
  );

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  }) as ObservableStatus<Response>;
};

export { useFetchAllChats };
