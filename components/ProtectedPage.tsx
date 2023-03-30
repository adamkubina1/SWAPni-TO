import { ReactNode, useEffect } from 'react';
import { useAuth, useSigninCheck } from 'reactfire';

const ProtectedPage = ({
  children,
  whenSignedOut,
}: {
  children: ReactNode;
  whenSignedOut?: string;
}) => {
  const auth = useAuth();
  const { status } = useSigninCheck();

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    const listener = auth.onAuthStateChanged((user) => {
      const shouldLogOut = !user && whenSignedOut;

      if (shouldLogOut) {
        const path = window.location.pathname;

        if (path !== whenSignedOut) {
          window.location.assign(whenSignedOut);
        }
      }
    });

    return () => listener();
  }, [auth, status, whenSignedOut]);

  return <>{children}</>;
};

export { ProtectedPage };
