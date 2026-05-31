// Firebase Configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJk7LIs9Qv_R7RCGkxSx8WQwNtwOY1Xk",
  authDomain: "stepwithus-a393c.firebaseapp.com",
  projectId: "stepwithus-a393c",
  storageBucket: "stepwithus-a393c.firebasestorage.app",
  messagingSenderId: "80151900064",
  appId: "1:80151900064:web:2929fb5827d1d939851720",
  measurementId: "G-2SFH2J98T0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);
