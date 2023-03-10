export const firestoreAutoId = (): string => {
  const CHARS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let autoId = '';
  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

import { firestore } from '@/lib/firebase-config';
import { collection, deleteDoc, doc } from 'firebase/firestore';

export const deleteFromFirestore = async (
  collectionName: string,
  documentId: string
) => {
  try {
    await deleteDoc(doc(collection(firestore, collectionName), documentId));
  } catch (error) {
    console.log(error);
  }
};
