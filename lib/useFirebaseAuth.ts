import { User as FirebaseUser } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../util/firebaseConfig';

type FormattedAuthUserType = {
  uid: string;
  email: string | null;
};

//In context of app these are the field we use
const formatAuthUser = (user: FirebaseUser): FormattedAuthUserType => ({
  uid: user.uid,
  email: user.email,
});

const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<FormattedAuthUserType | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

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

  //Listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
  };
};

export default useFirebaseAuth;
