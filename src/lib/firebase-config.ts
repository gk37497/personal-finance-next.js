// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
initializeApp({
  apiKey: 'AIzaSyDEEHKgLtnWlrTX5XsJd2kjwlMqeRNRkhw',
  authDomain: 'personal-finance-22c2a.firebaseapp.com',
  projectId: 'personal-finance-22c2a',
  storageBucket: 'personal-finance-22c2a.appspot.com',
  messagingSenderId: '128760753191',
  appId: '1:128760753191:web:e038f454b269a698e87202',
});

const firestore = getFirestore();
const auth = getAuth();
export { firestore, auth };
