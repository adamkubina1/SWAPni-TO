import { collection, deleteDoc, doc, Firestore } from 'firebase/firestore';

const deleteExchangeOffer = async (
  firestore: Firestore,
  exchangeOfferId: string
) => {
  const collectionPath = collection(firestore, '/exchangeOffers');
  const docPath = doc(collectionPath, exchangeOfferId);

  await deleteDoc(docPath);
};

export { deleteExchangeOffer };
