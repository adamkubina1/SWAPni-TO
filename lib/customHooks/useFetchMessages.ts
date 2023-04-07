import { collection, limit, orderBy, query } from 'firebase/firestore';
import {
  ObservableStatus,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { Message } from '../types/Message';

type Response = Message & { id: string };

const useFetchMessages = (chatId: string) => {
  const firestore = useFirestore();
  const maxFetchedMessages = 30;

  const collectionRef = collection(firestore, `/chats/${chatId}/messages`);
  const messagesQuery = query(
    collectionRef,
    orderBy('timestamp'),
    limit(maxFetchedMessages)
  );

  return useFirestoreCollectionData(messagesQuery, {
    idField: 'id',
  }) as ObservableStatus<Array<Response>>;
};

export { useFetchMessages };