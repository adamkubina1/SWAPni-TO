import { LOGIN_PATH, useAuth } from '@/context/AuthUserContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Custom hook.
 * Watching for changes in authUser, loading variables from useFirebaseAuth.ts through AuthUserContext.tsx.
 * If loading is false and authUser is null redirects to LOGIN_PATH constant from AuthUserContext.tsx.
 */
const useAuthProtectedRoute = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push(LOGIN_PATH);
  }, [authUser, loading, router]);
};

/**
 * Custom hook.
 * Watching for changes in authUser, loading variables from useFirebaseAuth.ts through AuthUserContext.tsx.
 * If loading is false and authUser is not null redirects to '/' url.
 */
const useNonAuthProtectedRoute = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser && !loading) router.push('/');
  }, [authUser, loading, router]);
};

export { useAuthProtectedRoute, useNonAuthProtectedRoute };
