import { collection, deleteDoc, doc, Firestore } from 'firebase/firestore';

const deleteBookOffer = async (firestore: Firestore, bookOfferId: string) => {
  const collectionPath = collection(firestore, '/bookOffers');
  const docPath = doc(collectionPath, bookOfferId);

  await deleteDoc(docPath);
};

export { deleteBookOffer };
