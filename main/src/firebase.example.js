import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration GOES HERE
const firebaseConfig = {
  apiKey: "*",
  authDomain: "*.firebaseapp.com",
  projectId: "*",
  storageBucket: "*.appspot.com",
  messagingSenderId: "*",
  appId: "*",
  measurementId: "*"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
