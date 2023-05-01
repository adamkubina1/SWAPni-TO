import { collection, query, where } from 'firebase/firestore';
import {
  ObservableStatus,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { ExchangeOfferType } from '../../types/ExchangeOfferType';

type Response = Array<ExchangeOfferType & { id: string }>;

/**
 * Fetches all incoming exchange requests for user
 * @param receiverId
 * @returns Observable status for exchange offers array
 */
const useFetchAllExchangesForReceiver = (receiverId: string) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/exchangeOffers');
  const offersQuery = query(
    collectionRef,
    where('receiverUserId', '==', receiverId)
  );

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  }) as ObservableStatus<Response>;
};

/**
 * Fetches all sent user requests for user
 * @param senderId
 * @returns Observable status for exchange offers array
 */
const useFetchAllExchangesForSender = (senderId: string) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, '/exchangeOffers');
  const offersQuery = query(
    collectionRef,
    where('senderUserId', '==', senderId)
  );

  return useFirestoreCollectionData(offersQuery, {
    idField: 'id',
  }) as ObservableStatus<Response>;
};

export { useFetchAllExchangesForReceiver, useFetchAllExchangesForSender };
