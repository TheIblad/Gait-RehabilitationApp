// Import the required Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBW9h9MSaC7wdtUjwo-L2AvJrEJKIPBqvE",
  authDomain: "gait-rehabilitation.firebaseapp.com",
  projectId: "gait-rehabilitation",
  storageBucket: "gait-rehabilitation.firebasestorage.app",
  messagingSenderId: "497138447235",
  appId: "1:497138447235:web:45faa3ec3dcc0178dabcb6",
  measurementId: "G-7NK5L86XE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
