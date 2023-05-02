import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useCallback } from 'react';
import { useAuth } from 'reactfire';
import { useRequestState } from './useRequestState';

/**
 * Custom hook used for sing in to firebase.
 * @returns Array [signUp, state] - signUp is function called on attempt to sign in, state  is the current hook state.
 *
 */
const useSignUpWithPass = () => {
  const auth = useAuth();

  const { state, setLoading, setData, setError } = useRequestState<
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

  return [signUp, state] as [typeof signUp, typeof state];
};

export { useSignUpWithPass };
