import NoSSR from '@/components/generic/NoSSR';
import { ProtectedPage } from '@/components/generic/ProtectedPage';
import { Seo } from '@/components/generic/Seo';
import { ExchangeTabs } from '@/components/pageSpecific/zadosti-o-vymeny/ExchangeTabs';
import { Heading, VStack } from '@chakra-ui/react';

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

export default ZadostiOVymeny;
