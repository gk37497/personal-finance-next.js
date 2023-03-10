import { useState, useEffect } from 'react';
import 'firebase/firestore';
import { firestore } from '../firebase-config';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  onSnapshot,
  CollectionReference,
  query,
  where,
} from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

type FirebaseHookResult<T> = {
  data: T[];
  loading: boolean;
  error?: any;
  collectionRef?: CollectionReference<DocumentData>;
};

const useFirebase = <T extends DocumentData>(
  collectionPath: string
): FirebaseHookResult<T> => {
  const { user } = useAuth();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const [collectionRef, setCollectionRef] =
    useState<CollectionReference<DocumentData>>();

  useEffect(() => {
    const colRef = collection(firestore, collectionPath);
    setCollectionRef(colRef);

    const q = query(
      collection(firestore, collectionPath),
      where('userId', '==', user?.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as unknown as T[]
        );
        setLoading(false);
      },
      (error: any) => {
        setLoading(false);
        setError(error);
      }
    );

    return () => unsubscribe();
  }, [collectionPath, user?.uid]);

  return { data, loading, error, collectionRef };
};

export default useFirebase;
