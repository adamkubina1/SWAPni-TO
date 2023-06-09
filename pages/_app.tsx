import FirebaseAppCheckProvider from '@/components/context/FirebaseAppCheckProvider';
import FirebaseAuthProvider from '@/components/context/FirebaseAuthProvider';
import FirebaseFirestoreProvider from '@/components/context/FirebaseFirestoreProvider';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import '@/styles/global.css';
import { theme } from '@/styles/theme';
import { firebaseConfig } from '@/utils/firebaseConfig';
import { ChakraProvider } from '@chakra-ui/react';
import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import type { AppProps } from 'next/app';
import {
  FirebaseAppProvider,
  FunctionsProvider,
  StorageProvider
} from 'reactfire';

export default function App({ Component, pageProps }: AppProps) {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const functions = getFunctions(app, 'europe-west3');

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <FirebaseAppCheckProvider>
        <FirebaseAuthProvider>
          <FirebaseFirestoreProvider>
            <StorageProvider sdk={storage}>
              <FunctionsProvider sdk={functions}>
                <ChakraProvider theme={theme}>
                  <DefaultLayout>
                    <Component {...pageProps} />
                  </DefaultLayout>
                </ChakraProvider>
              </FunctionsProvider>
            </StorageProvider>
          </FirebaseFirestoreProvider>
        </FirebaseAuthProvider>
      </FirebaseAppCheckProvider>
    </FirebaseAppProvider>
  );
}
