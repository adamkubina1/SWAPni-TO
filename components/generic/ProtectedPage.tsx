import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useAuth, useSigninCheck } from 'reactfire';

const ProtectedPage = ({
  children,
  whenSignedOut = '/',
}: {
  children: ReactNode;
  whenSignedOut?: string;
}) => {
  const auth = useAuth();
  const { status } = useSigninCheck();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    const listener = auth.onAuthStateChanged((user) => {
      const shouldLogOut = !user && whenSignedOut;

      if (shouldLogOut) {
        if (router.pathname !== whenSignedOut) {
          router.push(whenSignedOut);
        }
      }
    });

    return () => listener();
  }, [auth, status, router, whenSignedOut]);

  return <>{children}</>;
};

export { ProtectedPage };
