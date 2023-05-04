import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useCallback } from 'react';
import { useAuth } from 'reactfire';
import { useRequestAuthState } from './useRequestState';

const useSignInWithPass = () => {
  const auth = useAuth();

  const { authState, setLoading, setData, setError } = useRequestAuthState<
    UserCredential,
    FirebaseError
  >();

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
          setData(credentials);
        })
        .catch((error) => {
          setError(error as FirebaseError);
        });
    },
    [auth, setData, setError, setLoading]
  );

  return [signIn, authState] as [typeof signIn, typeof authState];
};

export { useSignInWithPass };
