import { collection, deleteDoc, doc, Firestore } from 'firebase/firestore';

const deleteChat = async (firestore: Firestore, chatId: string) => {
  const collectionPath = collection(firestore, '/chats');
  const docPath = doc(collectionPath, chatId);

  await deleteDoc(docPath);
};

export { deleteChat };
