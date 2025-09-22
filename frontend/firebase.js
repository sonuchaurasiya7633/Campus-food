// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "campusbites-3860e.firebaseapp.com",
  projectId: "campusbites-3860e",
  storageBucket: "campusbites-3860e.firebasestorage.app",
  messagingSenderId: "998572273222",
  appId: "1:998572273222:web:64a4b82d42e8c0a1b66447"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export{app,auth}