import FirebaseAppCheckProvider from '@/components/context/FirebaseAppCheckProvider';
import FirebaseAuthProvider from '@/components/context/FirebaseAuthProvider';
import FirebaseFirestoreProvider from '@/components/context/FirebaseFirestoreProvider';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import '@/styles/global.css';
import { theme } from '@/styles/theme';
import { firebaseConfig } from '@/utils/firebaseConfig';
import { ChakraProvider } from '@chakra-ui/react';
import { initializeApp } from 'firebase/app';
import type { AppProps } from 'next/app';
import { FirebaseAppProvider } from 'reactfire';

export default function App({ Component, pageProps }: AppProps) {
  const app = initializeApp(firebaseConfig);

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <FirebaseAppCheckProvider>
        <FirebaseAuthProvider>
          <FirebaseFirestoreProvider>
            <ChakraProvider theme={theme}>
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            </ChakraProvider>
          </FirebaseFirestoreProvider>
        </FirebaseAuthProvider>
      </FirebaseAppCheckProvider>
    </FirebaseAppProvider>
  );
}
