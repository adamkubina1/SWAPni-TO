import { FirebaseError } from 'firebase/app';
import {
  AuthProvider,
  browserPopupRedirectResolver,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { useCallback } from 'react';
import { useAuth } from 'reactfire';
import { useRequestAuthState } from './useRequestState';

const useSignInWithProvider = () => {
  const auth = useAuth();

  const { authState, setLoading, setData, setError } = useRequestAuthState<
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

  return [signInWithProvider, authState] as [
    typeof signInWithProvider,
    typeof authState
  ];
};

export { useSignInWithProvider };
