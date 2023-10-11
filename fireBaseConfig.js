// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOJswyiVwfeKMjQwxraFxgO2za87SRfdY",
  authDomain: "tmdb-6bdda.firebaseapp.com",
  projectId: "tmdb-6bdda",
  storageBucket: "tmdb-6bdda.appspot.com",
  messagingSenderId: "1046888433847",
  appId: "1:1046888433847:web:4cfd5f4138c7f9887ee532"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
};
