import { useSignInWithProvider } from '@/lib/customHooks/authHooks/useSignInWithProvider';
import { Button } from '@chakra-ui/button';
import { GoogleAuthProvider } from '@firebase/auth';
import { useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';

const GoogleSignButton = ({ onSignIn }: { onSignIn: () => void }) => {
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
        signInWithProvider(new GoogleAuthProvider());
      }}
      variant={'swapLightSolid'}
      leftIcon={<FaGoogle color={'#4285F4'} />}
    >
      Přihlášení Google
    </Button>
  );
};

export { GoogleSignButton };
