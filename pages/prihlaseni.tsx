import { LoginForm } from '@/components/forms/LoginForm';
import NoSSR from '@/components/NoSSR';
import { Seo } from '@/components/Seo';
import { Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const PAGE_TITLE = 'Přihlášení';
const PAGE_DESCRIPTION = 'Přihlášení do webové aplikace SWAPni TO.';

const Prihlaseni = () => {
  const router = useRouter();

  const onSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack
        pt={{ base: '10vh', md: '10vh' }}
        justifyContent={'center'}
        gap={10}
      >
        <Heading size={{ base: 'xl', md: '2xl' }}>Přihlášení</Heading>
        <NoSSR>
          <LoginForm onSignIn={onSignIn} />
        </NoSSR>
      </VStack>
    </>
  );
};

export default Prihlaseni;
