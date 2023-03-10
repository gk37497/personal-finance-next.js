import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
} from 'firebase/firestore';
import { useState } from 'react';
import { firestore } from '../firebase-config';

const useAddDocument = <T extends DocumentData>(
  collectionPath: string
): [(data: T) => Promise<void>, boolean, any] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const addDocument = async (data: T) => {
    setLoading(true);
    const collectionRef: CollectionReference = collection(
      firestore,
      collectionPath
    );

    try {
      await addDoc(collectionRef, data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return [addDocument, loading, error];
};

export default useAddDocument;
