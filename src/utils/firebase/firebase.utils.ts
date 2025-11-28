// ====================
// Authentication Imports
// ====================

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// ====================
// Type Imports
// ====================

import { User, NextOrObserver } from "firebase/auth";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { ObjectToAdd } from "./firebase.utils.types";
import { Category } from "../../store/categories/categories.types";
import { User as UserData } from "../../store/user/user.types";

// ====================
// Firebase Setup
// ====================

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  writeBatch,
} from "firebase/firestore";

// ====================
// Firebase Configuration
// ====================

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ====================
// Firebase Services
// ====================

export const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// ====================
// Auth Helper Functions
// ====================

export const signInWithGooglePopup = async () =>
  await signInWithPopup(auth, provider);

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

// ====================
// Firestore Helper Functions
// ====================

export const createUserDocumentFromAuth = async (
  userAuth: User
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const { uid } = userAuth;

  const userDocRef = doc(db, "users", uid);

  let userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });

      userSnapshot = await getDoc(userDocRef);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log("error creating the user: ", e.message);
      } else {
        console.log("Unexpected error: ", e);
      }
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionkey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionkey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const { title } = object;
    const docRef = doc(collectionRef, title.toLowerCase());
    batch.set(docRef, object);
  });

  batch.commit();
  console.log("done");
};
