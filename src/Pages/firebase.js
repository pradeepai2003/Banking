// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWh9t3rC7X7_f_vBnfQqW8xN13ctgwX4M",
  authDomain: "bank-management-cde77.firebaseapp.com",
  projectId: "bank-management-cde77",
  storageBucket: "gs://bank-management-cde77.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
