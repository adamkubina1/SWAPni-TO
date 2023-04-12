import { collection, deleteDoc, doc, Firestore } from 'firebase/firestore';

const deleteExchangeOffer = async (
  firestore: Firestore,
  exchangeOffer: string
) => {
  const collectionPath = collection(firestore, '/exchangeOffers');
  const docPath = doc(collectionPath, exchangeOffer);

  await deleteDoc(docPath);
};

export { deleteExchangeOffer };
