import { firebaseConfig } from '@/utils/firebaseConfig';
import { isBrowser } from '@firebase/util';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { ReactNode } from 'react';
import { AppCheckProvider, useFirebaseApp } from 'reactfire';

const FirebaseAppCheckProvider = ({ children }: { children: ReactNode }) => {
  const siteKey = firebaseConfig.recaptchaSiteKey;
  const app = useFirebaseApp();

  if (!siteKey || !isBrowser()) {
    return <>{children}</>;
  }

  const provider = new ReCaptchaV3Provider(siteKey);

  const sdk = initializeAppCheck(app, {
    provider,
    isTokenAutoRefreshEnabled: true,
  });

  return <AppCheckProvider sdk={sdk}>{children}</AppCheckProvider>;
};

export default FirebaseAppCheckProvider;
