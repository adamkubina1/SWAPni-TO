import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useCallback } from 'react';
import { useAuth } from 'reactfire';
import { useRequestState } from './useRequestState';

/**
 * Custom hook used for sing in to firebase.
 * @returns Array [signIn, state] - signIn is function called on attempt to sign in, state  is the current hook state.
 *
 */
const useSignInWithPass = () => {
  const auth = useAuth();

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((credential) => {
          setData(credential);
        })
        .catch((error) => {
          setError(error as FirebaseError);
        });
    },
    [auth, setData, setError, setLoading]
  );

  return [signIn, state] as [typeof signIn, typeof state];
};

export { useSignInWithPass };
