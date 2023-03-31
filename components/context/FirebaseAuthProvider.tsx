import { isBrowser } from '@firebase/util';
import {
  indexedDBLocalPersistence,
  initializeAuth,
  inMemoryPersistence,
} from 'firebase/auth';
import { ReactNode } from 'react';
import { AuthProvider, useFirebaseApp } from 'reactfire';

const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const app = useFirebaseApp();

  // indexedDB is not supported on server
  const persistence = isBrowser()
    ? indexedDBLocalPersistence
    : inMemoryPersistence;

  const auth = initializeAuth(app, { persistence });

  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
};

export default FirebaseAuthProvider;
