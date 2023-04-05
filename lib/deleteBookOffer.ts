import { collection, deleteDoc, doc, Firestore } from "firebase/firestore";

const deleteBookOffer = async (firestore: Firestore, bookOffer: string)=> {
    const collectionPath = collection(firestore, '/bookOffers')
    const docPath = doc(collectionPath, bookOffer);

    await deleteDoc(docPath);
}

export { deleteBookOffer };

