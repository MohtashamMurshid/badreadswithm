// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKnYqMykAKUS51Ogz1e2fqtUP2hMn7eYc",
  authDomain: "badreads-ef77d.firebaseapp.com",
  projectId: "badreads-ef77d",
  storageBucket: "badreads-ef77d.firebasestorage.app",
  messagingSenderId: "42314473518",
  appId: "1:42314473518:web:3ace0a90c2f00ac66b3fbf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
