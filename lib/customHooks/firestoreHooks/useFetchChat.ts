import { doc, DocumentReference } from 'firebase/firestore';
import { ObservableStatus, useFirestore, useFirestoreDocData } from 'reactfire';
import { Chat } from '../../types/Chat';

type Response = Chat & { id: string };

/**
 * Fetches chat based on its ID
 * @param chatId
 * @returns Observable status of chat
 */
const useFetchChat = (chatId: string) => {
  const firestore = useFirestore();
  const path = `/chats`;

  const ref = doc(firestore, path, chatId) as DocumentReference<Response>;

  return useFirestoreDocData(ref, {
    idField: 'id',
  }) as ObservableStatus<Response>;
};

export { useFetchChat };
