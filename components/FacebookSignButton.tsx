import { useSignInWithProvider } from '@/lib/customHooks/useSignInWithProvider';
import { Button } from '@chakra-ui/button';
import { FacebookAuthProvider } from 'firebase/auth';
import { useEffect } from 'react';
import { FaFacebook } from 'react-icons/fa';

const FacebookSignButton = ({ onSignIn }: { onSignIn: () => void }) => {
  const [signInWithProvider, state] = useSignInWithProvider();

  useEffect(() => {
    if (state.success) {
      onSignIn();
    }
  }, [state.success, onSignIn]);

  return (
    <Button
      w={'100%'}
      mt={8}
      onClick={() => {
        signInWithProvider(new FacebookAuthProvider());
      }}
      variant={'swapLightSolid'}
      leftIcon={<FaFacebook color={'#3b5998'} />}
    >
      Přihlášení Facebook
    </Button>
  );
};

export { FacebookSignButton };
