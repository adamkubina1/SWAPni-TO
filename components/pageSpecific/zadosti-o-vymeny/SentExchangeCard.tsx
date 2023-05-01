import { BookOfferCollumn } from '@/components/generic/BookOfferCollumn';
import { ResponsiveTooltip } from '@/components/generic/ResponsiveTootip';
import { UserAvatar } from '@/components/generic/UserAvatar';
import { UserRating } from '@/components/generic/UserRating';
import { useFetchProfile } from '@/lib/customHooks/firestoreHooks/useFetchProfile';
import { useFetchBook } from '@/lib/customHooks/googleBooksHooks/useFetchBook';
import { deleteExchangeOffer } from '@/lib/firestoreCalls/deleteExchangeOffer';
import { ExchangeOffer } from '@/lib/types/ExchangeOffer';
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MdOutlineMessage } from 'react-icons/md';
import { useFirestore } from 'reactfire';

export const SentExchangeCard = ({
  exchange,
}: {
  exchange: ExchangeOffer & { id: string };
}) => {
  const { status: profileStatus, data: profileData } = useFetchProfile(
    exchange.receiverUserId
  );
  const { data, error, isLoading } = useFetchBook(exchange.bookId);

  const firestore = useFirestore();

  if (isLoading) return <Spinner />;
  if (error) return <Text>Něco se pokazilo...</Text>;
  if (profileStatus === 'loading') return <Spinner />;

  return (
    <Box
      boxShadow={'xl'}
      color={'swap.darkText'}
      borderRadius={'md'}
      borderColor={'swap.lightBase'}
      _hover={{
        boxShadow: 'dark-lg',
      }}
      py={{ base: 4, md: 1 }}
      px={{ base: 2, md: 4 }}
    >
      <Stack direction={{ base: 'column', md: 'row' }} align={'center'} gap={4}>
        <VStack>
          <Link href={`uzivatel/${exchange.receiverUserId}`}>
            <UserAvatar userId={exchange.receiverUserId} size={'md'} />
          </Link>
          <UserRating
            userRating={profileData.userScore}
            ratingsCount={profileData.reviewsCount}
            userId={profileData.id}
          />
          <Heading size={'xs'} color={'swap.lightHighlight'}>
            {profileData?.userName ? profileData.userName : null}
          </Heading>
        </VStack>
        <HStack align={'start'}>
          <VStack align={'center'} maxW={'105'}>
            <Heading size={'xs'} color={'swap.darkHighlight'}>
              Jejich nabídka
            </Heading>
            <BookOfferCollumn offer={exchange.bookOffer} />
          </VStack>
          <VStack align={'center'} maxW={'105'}>
            <Heading size={'xs'} color={'swap.darkHighlight'}>
              Protinabídka
            </Heading>
            {exchange.counterOfferId ? (
              <BookOfferCollumn offer={exchange.counterOffer} />
            ) : (
              <Text>Nabyla nabídnuta</Text>
            )}
          </VStack>
        </HStack>
        <ResponsiveTooltip placement={'top-start'} text={exchange.message}>
          <Box _hover={{ cursor: 'pointer' }}>
            <MdOutlineMessage size={24} />
          </Box>
        </ResponsiveTooltip>

        <Button
          onClick={() => deleteExchangeOffer(firestore, exchange.id)}
          colorScheme={'red'}
          size={'sm'}
        >
          Smazat žádost
        </Button>
      </Stack>
    </Box>
  );
};
