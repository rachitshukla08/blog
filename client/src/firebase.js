// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-989c7.firebaseapp.com",
  projectId: "blog-app-989c7",
  storageBucket: "blog-app-989c7.appspot.com",
  messagingSenderId: "603157607151",
  appId: "1:603157607151:web:c7a04fd96e0aee659e211a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
