import {
  addDoc,
  collection,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';

const createMessage = async (
  firestore: Firestore,
  chatId: string,
  userId: string,
  message: string
) => {
  const collectionPath = collection(firestore, `chats/${chatId}/messages`);

  await addDoc(collectionPath, {
    userId: userId,
    message: message,
    timestamp: serverTimestamp(),
  });
};

export { createMessage };
