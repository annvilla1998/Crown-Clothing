// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch
} from 'firebase/firestore';
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
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


//Configure Database
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
console.log(objectsToAdd)
    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done')
};



export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if user data does not exists create and set document
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}


export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
}