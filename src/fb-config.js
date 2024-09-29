// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVOG_tn_Oe9BbYQh8B0vJkY2YH-agTG-U",
  authDomain: "doc-app-41988.firebaseapp.com",
  projectId: "doc-app-41988",
  storageBucket: "doc-app-41988.appspot.com",
  messagingSenderId: "1014089517227",
  appId: "1:1014089517227:web:399d3f8491cd252dc5cfee",
  measurementId: "G-C887BLHDN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStoreDb = getFirestore(app)