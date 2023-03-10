import { useState, useEffect } from 'react';
import { firestore } from '../firebase-config';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';

type FirebaseDocResult<T> = {
  data: T | null;
  loading: boolean;
  error?: any;
};

const useFirestoreDoc = <T extends DocumentData>(
  collectionPath: string,
  id: string
): FirebaseDocResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const documentRef = doc(firestore, collectionPath, id);

    const unsubscribe = onSnapshot(
      documentRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.data() as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    );

    return () => unsubscribe();
  }, [collectionPath, id]);

  return { data, loading, error };
};

export default useFirestoreDoc;
