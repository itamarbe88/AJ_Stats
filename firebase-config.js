import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSmR68M_nNvbJwY4rCWpJw6B2AJrh6XwQ",
  authDomain: "aj-stats-tracker.firebaseapp.com",
  projectId: "aj-stats-tracker",
  storageBucket: "aj-stats-tracker.firebasestorage.app",
  messagingSenderId: "78394536850",
  appId: "1:78394536850:web:0ee4edf615d97e7e11874b",
  measurementId: "G-S2RT53LTXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
