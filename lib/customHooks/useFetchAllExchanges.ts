import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const useFetchAllExchangesForReceiver = ({
  receiverId,
}: {
  receiverId: string;
}) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/exchangeOffers');
  const offersQuery = query(
    collectionRef,
    where('receiverUserId', '==', receiverId)
  );

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  });
};

const useFetchAllExchangesForSender = ({ senderId }: { senderId: string }) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/exchangeOffers');
  const offersQuery = query(
    collectionRef,
    where('senderUserId', '==', senderId)
  );

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  });
};

export { useFetchAllExchangesForReceiver, useFetchAllExchangesForSender };
