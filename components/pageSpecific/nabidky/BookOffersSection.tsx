import { useFetchAllOffersForUser } from '@/lib/customHooks/useFetchAllOffers';
import { Box, Spinner, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { BookOfferCard } from './BookOfferCard';

export const BookOffersSection = ({ userId }: { userId: string }) => {
  const { status, data: offers } = useFetchAllOffersForUser(userId);

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <>
      {offers.length > 0 ? (
        offers.map((offer, i) => (
          <BookOfferCard key={i} bookId={offer.bookId} offer={offer} />
        ))
      ) : (
        <Text>
          Žádné nabídky knih k nahlédnutí, přidejte je{' '}
          <Box as={'span'} color={'swap.lightHighlight'}>
            <Link href={'/'}>zde</Link>
          </Box>
          .
        </Text>
      )}
    </>
  );
};
