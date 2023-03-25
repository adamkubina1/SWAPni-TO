import { useFirebaseAuth, UseFirebaseAuthType } from '@/lib/useFirebaseAuth';
import { createContext, ReactNode, useContext } from 'react';

const authUserContext = createContext<UseFirebaseAuthType>({
  authUser: null,
  loading: true,
  signInPassword: async () => {},
  createUserPassword: async () => {},
  signOut: async () => {},
});

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);

export const LOGIN_PATH = '/prihlaseni';
