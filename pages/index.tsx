import { useAuth } from '@/context/AuthUserContext';
import { Box, Button, Heading } from '@chakra-ui/react';

const Home = () => {
  const { signOut } = useAuth();

  const logout = () => {
    signOut();
  };

  return (
    <Box h={'100%'} pt={24}>
      <Heading>This is home page</Heading>
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
};

export default Home;
