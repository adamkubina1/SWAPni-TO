import { ProtectedPage } from '@/components/generic/ProtectedPage';
import { Seo } from '@/components/generic/Seo';
import { ChatLinks } from '@/components/pageSpecific/zpravy/ChatLinks';
import { Heading, Spinner, VStack } from '@chakra-ui/react';
import { useSigninCheck } from 'reactfire';

const PAGE_TITLE = 'Chaty';
const PAGE_DESCRIPTION =
  'Správa uživatelových chatů ve webové aplikace SWAPni TO.';

const Chats = () => {
  const user = useSigninCheck();

  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack pt={'10vh'} justifyContent={'center'} gap={6}>
        <Heading size={{ base: 'lg', md: '2xl' }}>Domlouvané výměny</Heading>
        {user.status !== 'loading' && user.data.user?.uid ? (
          <ChatLinks userId={user.data.user?.uid} />
        ) : (
          <Spinner />
        )}
      </VStack>
    </ProtectedPage>
  );
};

export default Chats;
