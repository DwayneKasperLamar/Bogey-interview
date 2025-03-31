// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuz4m7eBM_BTz-BxdSc5UTaRAswofqdzA",
  authDomain: "interview-6d4c8.firebaseapp.com",
  projectId: "interview-6d4c8",
  storageBucket: "interview-6d4c8.firebasestorage.app",
  messagingSenderId: "320966076512",
  appId: "1:320966076512:web:d96c71841266eda9d6bb05",
  measurementId: "G-DPNQ3EDQC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);