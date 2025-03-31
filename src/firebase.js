import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// 🔹 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB36QZR4IbTcQJwvHqnCH4HqXO51cC4Uew",
  authDomain: "linkdin-goby.firebaseapp.com",
  projectId: "linkdin-goby",
  storageBucket: "linkdin-goby.appspot.com",
  messagingSenderId: "848135712334",
  appId: "1:848135712334:web:b59ac6adc62e2a1bfa5d1f",
  measurementId: "G-1DFVMC2FK2",
  databaseURL: "https://linkdin-goby-default-rtdb.firebaseio.com",
};

// 🔹 Initialize Firebase App only if it is not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 🔹 Get Database Reference
const database = getDatabase(app);

export { app, database };
