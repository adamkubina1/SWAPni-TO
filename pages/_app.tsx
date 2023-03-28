import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { AuthUserProvider } from '@/context/AuthUserContext';
import '@/styles/global.css';
import { theme } from '@/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <ChakraProvider theme={theme}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ChakraProvider>
    </AuthUserProvider>
  );
}
