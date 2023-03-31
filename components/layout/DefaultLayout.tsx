import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useSigninCheck } from 'reactfire';
import NoSSR from '../NoSSR';
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

  //Potentionaly put here spinner or skeleton
  if (status === 'loading') return null;

  return <>{signInCheckResult.signedIn ? <NavbarAuth /> : <NavbarNonAuth />}</>;
};

export { DefaultLayout };
