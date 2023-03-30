import { DefaultLayout } from '@/components/layout/DefaultLayout';
import '@/styles/global.css';
import { theme } from '@/styles/theme';
import { firebaseConfig } from '@/utils/firebaseConfig';
import { ChakraProvider } from '@chakra-ui/react';
import { initializeApp } from '@firebase/app';
import { isBrowser } from '@firebase/util';
import {
  indexedDBLocalPersistence,
  initializeAuth,
  inMemoryPersistence,
} from 'firebase/auth';
import type { AppProps } from 'next/app';
import { AuthProvider, FirebaseAppProvider } from 'reactfire';

export default function App({ Component, pageProps }: AppProps) {
  const app = initializeApp(firebaseConfig);

  // indexedDB is not supported on server
  const persistence = isBrowser()
    ? indexedDBLocalPersistence
    : inMemoryPersistence;

  const auth = initializeAuth(app, { persistence });

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <ChakraProvider theme={theme}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </ChakraProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
}
