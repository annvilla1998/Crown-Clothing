// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKUUAuNYsRllhdY2DeH99mCow17oJuQ3U",
  authDomain: "crown-clothing-db-8be6b.firebaseapp.com",
  projectId: "crown-clothing-db-8be6b",
  storageBucket: "crown-clothing-db-8be6b.appspot.com",
  messagingSenderId: "1023336034447",
  appId: "1:1023336034447:web:7e5f02a9146b288b6340fa"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Configure Google provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);