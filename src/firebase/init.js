// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgZtftDaEC8Mos4uyhNR2ZOEbDqVKKdJ4",
  authDomain: "fir-practise-90d5b.firebaseapp.com",
  projectId: "fir-practise-90d5b",
  storageBucket: "fir-practise-90d5b.appspot.com",
  messagingSenderId: "993934727574",
  appId: "1:993934727574:web:5a128b92a588781365a5b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth()
 export const db = getFirestore()