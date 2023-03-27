import { useAuth } from '@/context/AuthUserContext';
import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Footer } from './Footer';
import { NavbarAuth } from './navbar/NavbarAuth';
import { NavbarNonAuth } from './navbar/NavbarNonAuth';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const { authUser } = useAuth();

  return (
    <Box w={'100%'}>
      {authUser ? <NavbarAuth /> : <NavbarNonAuth />}
      <Container as={'main'} minH={'100vh'}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export { DefaultLayout };
