import { BookOfferCollumn } from '@/components/generic/BookOfferCollumn';
import { ResponsiveTooltip } from '@/components/generic/ResponsiveTootip';
import { UserAvatar } from '@/components/generic/UserAvatar';
import { UserRating } from '@/components/generic/UserRating';
import { acceptExchangeOffer } from '@/lib/cloudFunctionsCalls/acceptExchangeOffer';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { deleteExchangeOffer } from '@/lib/deleteExchangeOffer';
import { ExchangeOffer } from '@/lib/types/ExchangeOffer';
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineMessage } from 'react-icons/md';
import { useFirestore, useFunctions } from 'reactfire';

export const IncomingExchangeCard = ({
  exchange,
}: {
  exchange: ExchangeOffer & { id: string };
}) => {
  const { status: profileStatus, data: profileData } = useFetchProfile(
    exchange.senderUserId
  );
  const firestore = useFirestore();
  const functions = useFunctions();
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);

  if (profileStatus === 'loading') return <Spinner />;
  if (profileStatus === 'error') return null;

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
          <Link href={`uzivatel/${exchange.senderUserId}`}>
            <UserAvatar userId={exchange.senderUserId} size={'md'} />
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
              Moje nabídka
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
        <VStack>
          <Button
            isLoading={isLoading}
            loadingText={'Přijímá se'}
            onClick={() => {
              setLoading(true);
              acceptExchangeOffer(functions, exchange.id)
                .then(() => {
                  toast({
                    title: 'Žádost schválena.',
                    description: 'Byl vytvořen chat pro domluvení předání.',
                    status: 'success',
                    duration: 8000,
                    isClosable: true,
                  });
                  setLoading(false);
                })
                .catch(() => {
                  setLoading(false);
                });
            }}
            colorScheme={'green'}
            size={'sm'}
          >
            Přijmout žádost
          </Button>
          <Button
            onClick={() => deleteExchangeOffer(firestore, exchange.id)}
            colorScheme={'red'}
            size={'sm'}
          >
            Smazat žádost
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
};
