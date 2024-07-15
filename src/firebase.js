// This file is used to connect the app to the firebase database and storage.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8MuDH1m9o3HVgozVOjToA0UA6GLwjX8E",
  authDomain: "instagram-clone-using-re-5c02a.firebaseapp.com",
  projectId: "instagram-clone-using-re-5c02a",
  storageBucket: "instagram-clone-using-re-5c02a.appspot.com",
  messagingSenderId: "940243710403",
  appId: "1:940243710403:web:7a2245ea8f3cc8a6858d76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();
export { db, auth, storage };