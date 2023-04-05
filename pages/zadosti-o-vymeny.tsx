import NoSSR from '@/components/NoSSR';
import { ProtectedPage } from '@/components/ProtectedPage';
import { Seo } from '@/components/Seo';
import { UserAvatar } from '@/components/UserAvatar';
import { acceptExchangeOffer } from '@/lib/cloudFunctionsCalls/acceptExchangeOffer';
import {
  useFetchAllExchangesForReceiver,
  useFetchAllExchangesForSender,
} from '@/lib/customHooks/useFetchAllExchanges';
import { useFetchBook } from '@/lib/customHooks/useFetchBook';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { deleteExchangeOffer } from '@/lib/deleteExchangeOffer';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { ExchangeOffer } from '@/lib/types/ExchangeOffer';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
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
  const { data, error, isLoading } = useFetchBook(exchange.bookId);
  const firestore = useFirestore();
  const functions = useFunctions();

  if (isLoading) return <Spinner />;
  if (error) return <Text>Něco se pokazilo...</Text>;

  const bookData = data as GoogleBookApiBook;
  const imgUrl = getHighestSizeLinkUrl(bookData.volumeInfo.imageLinks);

  return (
    <Box>
      <HStack>
        <VStack>
          <Link href={`uzivatel/${exchange.receiverUserId}`}>
            <UserAvatar userId={exchange.receiverUserId} size={'md'} />
            <Heading size={'xs'}>
              {profileData?.userName ? profileData.userName : null}
            </Heading>
          </Link>
        </VStack>
        <VStack>
          <Link href={`/kniha/${exchange.bookId}`}>
            <Box
              pos={'relative'}
              w={{ base: 150, md: 150 }}
              h={{ base: 200, md: 200 }}
              minW={150}
              objectFit={'cover'}
              overflow={'hidden'}
              mr={2}
              borderRadius={'md'}
            >
              <Image
                src={imgUrl ? imgUrl : '/imgs/book-placeholder.jpg'}
                fill
                alt={bookData.volumeInfo.title}
              />
            </Box>
          </Link>
        </VStack>
        <VStack>
          <Button onClick={() => deleteExchangeOffer(firestore, exchange.id)}>
            Odmítnout
          </Button>
          <Button onClick={() => acceptExchangeOffer(functions, exchange.id)}>
            Přijmout
          </Button>
        </VStack>
      </HStack>
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

  const bookData = data as GoogleBookApiBook;
  const imgUrl = getHighestSizeLinkUrl(bookData.volumeInfo.imageLinks);

  return (
    <Box>
      <HStack>
        <VStack>
          <Link href={`uzivatel/${exchange.receiverUserId}`}>
            <UserAvatar userId={exchange.receiverUserId} size={'md'} />
            <Heading size={'xs'}>
              {profileData?.userName ? profileData.userName : null}
            </Heading>
          </Link>
        </VStack>
        <VStack>
          <Link href={`/kniha/${exchange.bookId}`}>
            <Box
              pos={'relative'}
              w={{ base: 150, md: 150 }}
              h={{ base: 200, md: 200 }}
              minW={150}
              objectFit={'cover'}
              overflow={'hidden'}
              mr={2}
              borderRadius={'md'}
            >
              <Image
                src={imgUrl ? imgUrl : '/imgs/book-placeholder.jpg'}
                fill
                alt={bookData.volumeInfo.title}
              />
            </Box>
          </Link>
        </VStack>
        <Button onClick={() => deleteExchangeOffer(firestore, exchange.id)}>
          Zrušit
        </Button>
      </HStack>
    </Box>
  );
};

export default ZadostiOVymeny;
