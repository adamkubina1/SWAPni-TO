import { useAuth } from '@/context/AuthUserContext';
import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Prihlaseni = () => {
  const { signInGoogle } = useAuth();
  const router = useRouter();

  const sign = () => {
    signInGoogle();
    router.push('/');
  };

  return (
    <Box pt={24}>
      <Button onClick={sign}>sign in</Button>
    </Box>
  );
};

export default Prihlaseni;
