import { OfferCard } from '@/components/OfferCard';
import { VStack } from '@chakra-ui/react';
import { connectHits } from 'react-instantsearch-dom';

const Hits = ({
  hits,
  userUID,
}: {
  hits: any;
  userUID: string | undefined;
}) => {
  if (hits.length < 1) return null;

  return (
    <VStack w={'full'}>
      {hits.map((hit: any, i: any) => (
        <OfferCard key={i} offer={hit} userUID={userUID} />
      ))}
    </VStack>
  );
};

export default connectHits(Hits);
