import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB3-OejRk6yccP9hYN0gk8fPZ2BU4ficcI",
    authDomain: "ztm-project-db-8e72c.firebaseapp.com",
    projectId: "ztm-project-db-8e72c",
    storageBucket: "ztm-project-db-8e72c.appspot.com",
    messagingSenderId: "335677901405",
    appId: "1:335677901405:web:234931c424e7e0170bdbb4"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
  
  export const auth = getAuth();
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

 export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
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
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}