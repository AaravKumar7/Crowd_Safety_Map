import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVGniN9r_Y-OJhzmHNjPtyQiNGnimsW7k",
  authDomain: "saferoute-ai-c3365.firebaseapp.com",
  projectId: "saferoute-ai-c3365",
  storageBucket: "saferoute-ai-c3365.firebasestorage.app",
  messagingSenderId: "373168128525",
  appId: "1:373168128525:web:68f5d469f28ae8ab594b44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
