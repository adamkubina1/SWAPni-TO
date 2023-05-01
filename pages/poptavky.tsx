import { ProtectedPage } from '@/components/generic/ProtectedPage';
import { Seo } from '@/components/generic/Seo';
import { BookDemandsList } from '@/components/pageSpecific/poptavky/BookDemandsList';
import { InfoIcon } from '@chakra-ui/icons';
import { Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { useSigninCheck } from 'reactfire';

const PAGE_TITLE = 'Moje poptávky';
const PAGE_DESCRIPTION =
  'Přehled uživatelových poptávek ve webové aplikaci SWAPni TO.';

const Demands = () => {
  const signIn = useSigninCheck();

  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack pt={'10vh'} justifyContent={'center'} gap={6}>
        <Heading size={{ base: 'lg', md: '2xl' }}>Moje poptávky</Heading>
        <Text>
          <InfoIcon w={8} h={6} />
          Poptávky slouží jako hlídací pes pro knihu. Vždy když k vámi poptávané
          knize je přidána nová nabídka dostanete emailové upozornění.
        </Text>
        {signIn.data?.user?.uid ? (
          <BookDemandsList userId={signIn.data.user.uid} />
        ) : (
          <Spinner />
        )}
      </VStack>
    </ProtectedPage>
  );
};

export default Demands;
