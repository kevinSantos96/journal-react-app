//importaciones 
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


//nuestra configuracion por parte de firebas
const firebaseConfig = {
    apiKey: "AIzaSyBzJN9Ucn5ymKh_1X65D1s1_fUgxpJHUOM",
    authDomain: "journal-app-4b6dc.firebaseapp.com",
    projectId: "journal-app-4b6dc",
    storageBucket: "journal-app-4b6dc.appspot.com",
    messagingSenderId: "163456444736",
    appId: "1:163456444736:web:f1c41773c103bc2e6832a5"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
}