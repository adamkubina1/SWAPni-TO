import { collection, deleteDoc, doc, Firestore } from 'firebase/firestore';

const deleteDemand = async (firestore: Firestore, demandId: string) => {
  const collectionPath = collection(firestore, '/bookDemands');
  const docPath = doc(collectionPath, demandId);

  await deleteDoc(docPath);
};

export { deleteDemand };
