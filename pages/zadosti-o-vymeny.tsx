import { BookOfferCollumn } from '@/components/BookOfferCollumn';
import NoSSR from '@/components/NoSSR';
import { ProtectedPage } from '@/components/ProtectedPage';
import { ResponsiveTooltip } from '@/components/ResponsiveTootip';
import { Seo } from '@/components/Seo';
import { UserAvatar } from '@/components/UserAvatar';
import { UserRating } from '@/components/UserRating';
import { acceptExchangeOffer } from '@/lib/cloudFunctionsCalls/acceptExchangeOffer';
import {
  useFetchAllExchangesForReceiver,
  useFetchAllExchangesForSender,
} from '@/lib/customHooks/useFetchAllExchanges';
import { useFetchBook } from '@/lib/customHooks/useFetchBook';
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineMessage } from 'react-icons/md';
import { useFirestore, useFunctions, useSigninCheck } from 'reactfire';

const PAGE_TITLE = 'Žádosti o výměny';
const PAGE_DESCRIPTION =
  'Správa žádostí o výměny uživatele v rámci webové aplikace SWAPni TO.';

const ZadostiOVymeny = () => {
  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack
        pt={{ base: '10vh', md: '10vh' }}
        justifyContent={'center'}
        gap={10}
      >
        <Heading size={{ base: 'xl', md: '2xl' }}>Žádosti o výměnu</Heading>
        <NoSSR>
          <ExchangeTabs />
        </NoSSR>
      </VStack>
    </ProtectedPage>
  );
};

const ExchangeTabs = () => {
  const { status, data: signInStatus } = useSigninCheck();

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  return (
    <>
      {signInStatus.signedIn ? (
        <Tabs variant={'enclosed'} align={'center'} isLazy>
          <TabList>
            <Tab>Příchozí žádosti</Tab>
            <Tab>Moje žádosti</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {signInStatus.user ? (
                <IncomingExchanges userId={signInStatus.user.uid} />
              ) : null}
            </TabPanel>
            <TabPanel>
              {signInStatus.user ? (
                <SentExchanges userId={signInStatus.user.uid} />
              ) : null}
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : null}
    </>
  );
};

const IncomingExchanges = ({ userId }: { userId: string }) => {
  const { status, data } = useFetchAllExchangesForReceiver({
    receiverId: userId,
  });

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo</Text>;

  const incomingExchanges = data as Array<ExchangeOffer & { id: string }>;

  return (
    <VStack>
      {incomingExchanges.map((exchange, i) => (
        <IncomingExchangeCard key={i} exchange={exchange} />
      ))}
    </VStack>
  );
};

const IncomingExchangeCard = ({
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

const SentExchanges = ({ userId }: { userId: string }) => {
  const { status, data } = useFetchAllExchangesForSender({
    senderId: userId,
  });

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo</Text>;

  const sentExchanges = data as Array<ExchangeOffer & { id: string }>;

  return (
    <VStack>
      {sentExchanges.map((exchange, i) => (
        <SentExchangeCard key={i} exchange={exchange} />
      ))}
    </VStack>
  );
};

const SentExchangeCard = ({
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

export default ZadostiOVymeny;
