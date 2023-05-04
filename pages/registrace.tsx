import { SignUpForm } from '@/components/forms/SignUpForm';
import NoSSR from '@/components/generic/NoSSR';
import { Seo } from '@/components/generic/Seo';
import { Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const PAGE_TITLE = 'Registrace';
const PAGE_DESCRIPTION = 'Registrace nového účtu do webové aplikace SWAPni TO.';

const Registrace = () => {
  const router = useRouter();

  const onSignUp = useCallback(() => {
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
        <Heading size={{ base: 'xl', md: '2xl' }}>Registrace</Heading>
        <NoSSR>
          <SignUpForm onSignUp={onSignUp} />
        </NoSSR>
      </VStack>
    </>
  );
};

export default Registrace;
