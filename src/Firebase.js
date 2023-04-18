// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHnF4zBgALDRR8tjX69ITXvRoSP_j0wSQ",
  authDomain: "educacion-dcu.firebaseapp.com",
  projectId: "educacion-dcu",
  storageBucket: "educacion-dcu.appspot.com",
  messagingSenderId: "1023064549751",
  appId: "1:1023064549751:web:e7b15637c91edc393a5972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;