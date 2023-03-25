import { auth } from '@/utils/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User as FirebaseUser,
} from 'firebase/auth';
import { useEffect, useState } from 'react';

/**
 * TYPES
 * -----------------------------------------------------------------
 */

type FormattedAuthUserType = {
  uid: string;
  email: string | null;
};

type UseFirebaseAuthType = {
  authUser: FormattedAuthUserType | null;
  loading: boolean;
  signInPassword: (email: string, password: string) => Promise<any>;
  createUserPassword: (email: string, password: string) => Promise<any>;
  signInGoogle: () => Promise<any>;
  signOut: () => Promise<any>;
};

/**
 * -----------------------------------------------------------------
 */

//In context of app these are the field we use
const formatAuthUser = (user: FirebaseUser): FormattedAuthUserType => ({
  uid: user.uid,
  email: user.email,
});

const useFirebaseAuth = (): UseFirebaseAuthType => {
  const [authUser, setAuthUser] = useState<FormattedAuthUserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const googleProvider = new GoogleAuthProvider();

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    let formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInPassword = (email: string, password: string): any =>
    signInWithEmailAndPassword(auth, email, password);

  const createUserPassword = (email: string, password: string): any =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInGoogle = () => signInWithPopup(auth, googleProvider);

  const signOut = () => auth.signOut().then(clear);

  //Listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInPassword,
    createUserPassword,
    signInGoogle,
    signOut,
  };
};

export { useFirebaseAuth };
export type { UseFirebaseAuthType };
