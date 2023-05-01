import {
  useFetchAllExchangesForReceiver,
  useFetchAllExchangesForSender,
} from '@/lib/customHooks/firestoreHooks/useFetchAllExchanges';
import {
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useSigninCheck } from 'reactfire';
import { IncomingExchangeCard } from './IncomingExchangeCard';
import { SentExchangeCard } from './SentExchangeCard';

export const ExchangeTabs = () => {
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
  const { status, data } = useFetchAllExchangesForReceiver(userId);

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo</Text>;

  return (
    <VStack>
      {data.map((exchange, i) => (
        <IncomingExchangeCard key={i} exchange={exchange} />
      ))}
    </VStack>
  );
};

const SentExchanges = ({ userId }: { userId: string }) => {
  const { status, data } = useFetchAllExchangesForSender(userId);

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo</Text>;

  return (
    <VStack>
      {data.map((exchange, i) => (
        <SentExchangeCard key={i} exchange={exchange} />
      ))}
    </VStack>
  );
};
