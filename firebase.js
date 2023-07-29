// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvUPWZ96ZHHrzvPa2N-XAnFF6ZxboE-w4",
  authDomain: "wedding-picture-app.firebaseapp.com",
  projectId: "wedding-picture-app",
  storageBucket: "wedding-picture-app.appspot.com",
  messagingSenderId: "681171184568",
  appId: "1:681171184568:web:0596738f71b18e17a0bd4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);