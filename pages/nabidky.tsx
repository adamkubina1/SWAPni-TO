import { ProtectedPage } from '@/components/generic/ProtectedPage';
import { Seo } from '@/components/generic/Seo';
import { BookOffersSection } from '@/components/pageSpecific/nabidky/BookOffersSection';
import { Heading, Spinner, VStack } from '@chakra-ui/react';
import { useSigninCheck } from 'reactfire';

const PAGE_TITLE = 'Moje nabídky';
const PAGE_DESCRIPTION =
  'Správa uživatelových nabídek knih do webové aplikace SWAPni TO.';

const Nabidky = () => {
  const signIn = useSigninCheck();

  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack pt={'10vh'} justifyContent={'center'} gap={6}>
        <Heading size={{ base: 'lg', md: '2xl' }}>Moje nabídky knih</Heading>
        {signIn.data?.user?.uid ? (
          <BookOffersSection userId={signIn.data.user?.uid} />
        ) : (
          <Spinner />
        )}
      </VStack>
    </ProtectedPage>
  );
};

export default Nabidky;
