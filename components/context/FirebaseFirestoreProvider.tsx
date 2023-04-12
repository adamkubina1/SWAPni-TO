import { initializeFirestore } from 'firebase/firestore';
import { ReactNode } from 'react';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';

// function useFirestore() {
//   const app = useFirebaseApp();

//   return useMemo(() => initializeFirestore(app, {}), [app]);
// }

const FirebaseFirestoreProvider = ({ children }: { children: ReactNode }) => {
  const app = useFirebaseApp();
  const firestore = initializeFirestore(app, {});

  // This code should enable offline database, but it throws errors
  //   const enablePersistence = isBrowser();

  //   if (enablePersistence) {
  //     enableIndexedDbPersistence(firestore);
  //   }

  return <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>;
};

export default FirebaseFirestoreProvider;
