import { useFetchAllDemandsForUser } from '@/lib/customHooks/firestoreHooks/useFetchAllDemands';
import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { BookDemandCard } from './BookDemandCard';

export const BookDemandsList = ({ userId }: { userId: string }) => {
  const { status, data } = useFetchAllDemandsForUser(userId);

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  if (data.length < 1)
    return (
      <Text>
        Žádné poptávky knih k nahlédnutí, přidejte je{' '}
        <Box as={'span'} color={'swap.lightHighlight'}>
          <Link href={'/'}>zde</Link>
        </Box>
        .
      </Text>
    );

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
      {data.map((demand, i) => (
        <BookDemandCard key={i} demand={demand} />
      ))}
    </SimpleGrid>
  );
};
