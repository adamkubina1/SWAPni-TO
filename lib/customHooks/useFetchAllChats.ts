import { collection, or, query, where } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const useFetchAllChats = ({ userId }: { userId: string }) => {
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
  });
};

export { useFetchAllChats };
