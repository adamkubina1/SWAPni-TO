import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useCallback } from 'react';
import { useAuth } from 'reactfire';
import { useRequestAuthState } from './useRequestState';

const useSignUpWithPass = () => {
  const auth = useAuth();

  const { authState, setLoading, setData, setError } = useRequestAuthState<
    UserCredential,
    FirebaseError
  >();

  const signUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
          setData(credentials);
        })
        .catch((error) => {
          setError(error as FirebaseError);
        });
    },
    [auth, setData, setError, setLoading]
  );

  return [signUp, authState] as [typeof signUp, typeof authState];
};

export { useSignUpWithPass };
