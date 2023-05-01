import { Box, Container, Skeleton } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useSigninCheck } from 'reactfire';
import NoSSR from '../generic/NoSSR';
import { Footer } from './Footer';
import { NavbarAuth } from './navbar/NavbarAuth';
import { NavbarNonAuth } from './navbar/NavbarNonAuth';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      w={'100%'}
      h={'100%'}
      bgColor={'swap.darkBase'}
      color={'swap.darkText'}
    >
      <NoSSR>
        <NavbarAuthRender />
      </NoSSR>
      <Container as={'main'} minH={'100vh'}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

const NavbarAuthRender = () => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === 'loading')
    return (
      <Box w={'100%'} h={'8vh'}>
        <Skeleton w={'full'} h={'full'} />
      </Box>
    );

  return <>{signInCheckResult.signedIn ? <NavbarAuth /> : <NavbarNonAuth />}</>;
};

export { DefaultLayout };
