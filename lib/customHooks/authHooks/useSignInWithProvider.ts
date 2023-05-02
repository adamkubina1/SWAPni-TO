import { FirebaseError } from 'firebase/app';
import {
  AuthProvider,
  browserPopupRedirectResolver,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { useCallback } from 'react';
import { useAuth } from 'reactfire';
import { useRequestState } from './useRequestState';

/**
 * Custom hook implementing sign in with any provider supported by firebase.
 * @returns Array [signInWithProvider, state] signInWithProvider is function with param of used Provider.
 */
const useSignInWithProvider = () => {
  const auth = useAuth();

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  const signInWithProvider = useCallback(
    async (provider: AuthProvider) => {
      setLoading(true);

      signInWithPopup(auth, provider, browserPopupRedirectResolver)
        .then((credentials) => {
          setData(credentials);
        })
        .catch((error) => {
          setError(error as FirebaseError);
        });
    },
    [auth, setData, setError, setLoading]
  );

  return [signInWithProvider, state] as [
    typeof signInWithProvider,
    typeof state
  ];
};

export { useSignInWithProvider };
