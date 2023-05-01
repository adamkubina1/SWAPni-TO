import { OfferCard } from '@/components/generic/OfferCard';
import { useFetchAllOffersForBook } from '@/lib/customHooks/firestoreHooks/useFetchAllOffers';
import { Spinner, Text, VStack } from '@chakra-ui/react';
import { useSigninCheck } from 'reactfire';

export const BookRelatedContent = ({ bookId }: { bookId: string }) => {
  const { data: signInCheckResult } = useSigninCheck();
  const { status, data: bookOffers } = useFetchAllOffersForBook(bookId);

  if (!signInCheckResult?.signedIn) {
    return null;
  }
  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  return (
    <VStack w={'full'}>
      {bookOffers.map((offer, i) => (
        <OfferCard key={i} offer={offer} userUID={signInCheckResult.user.uid} />
      ))}
    </VStack>
  );
};
